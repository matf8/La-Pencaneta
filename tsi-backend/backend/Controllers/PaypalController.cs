using AutoMapper;
using backend.Auth;
using backend.Data;
using backend.DataTypes;
using backend.Entities;
using backend.Mongo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using System.Collections;
using backend.Enum;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaypalController : ControllerBase
    {
        private readonly PaypalMongoService _service;
        private readonly BackendContext _context;
        private readonly IMapper _mapper;
        public PaypalController(PaypalMongoService service, BackendContext context, IMapper mapper)
        {
            _service = service;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("all")]
        public async Task<ActionResult> GetAll()
        {
            var salida = await _service.GetAsync();
            return Ok(salida);

        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<TransaccionPaypal>>> GetbyAuth()
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No encontrado");
            var salida = await _context.TransaccionPaypal.Where(x=>x.UsuarioId == usuario.Id).ToListAsync();
            return Ok(salida);
        }

        [HttpPost("checkout")]
        [Authorize]
        public async Task<ActionResult> CheckoutPaypal(DTAddTransaccionPaypal dT)
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No encontrado");
            
            var mongo = await _service.GetAsync(dT.MongoId);
            if (mongo == null) return NotFound("Transaccion No encontrada");
            if (mongo.userId != usuario.Email) return BadRequest("Usuario registrado no coincide con transaccion presentada");

            var penca = await _context.Penca.FindAsync(dT.PencaId);
            if (penca == null) return NotFound("Penca No encontrada");

            var transaccion = await _context.TransaccionPaypal.Where(x=>x.MongoId==dT.MongoId).FirstOrDefaultAsync();
            if (transaccion != null) return BadRequest("Transaccion ya registrada");

            var usuariopenca = await _context.UsuarioPenca.Where(x => x.UsuarioId == usuario.Id && x.PencaId == penca.Id).FirstOrDefaultAsync();
            if (usuariopenca == null) return NotFound("Error buscando UsuarioPenca");

            var unicaPenca = await _context.TransaccionPaypal.Where(x=>x.UsuarioId == usuario.Id && x.Status == "approved" && usuariopenca.StatusPenca == StatusPenca.AprobadoPaypal).FirstOrDefaultAsync();
            if (unicaPenca != null) return BadRequest("La penca ya se encuentra pagada y aprobada por el cliente");

            try
            {
                var guardar = new TransaccionPaypal
                {
                    MongoId = dT.MongoId,
                    Status = mongo.invoice.state,
                    Monto = float.Parse(mongo.invoice.transactions[0].amount.total),
                    UsuarioId = usuario.Id,
                    PencaId = penca.Id
                };
                usuariopenca.StatusPenca = StatusPenca.AprobadoPaypal;
                _context.Update(guardar);
                _context.Update(usuariopenca);

                await _context.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return BadRequest("Problema guardando Transaccion");
            }
        }


    }
}
