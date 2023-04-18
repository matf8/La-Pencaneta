using AutoMapper;
using backend.Auth;
using backend.Data;
using backend.DataTypes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MensajesController : ControllerBase
    {
        private readonly BackendContext _context;
        private readonly IMapper _mapper;

        public MensajesController(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpGet("get-num-msj")]
        public async Task<IActionResult> GetCountMsj()
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No existe");
            var contar = await _context.Mensaje.Where(x=>x.Leido== true).CountAsync();
            return Ok(contar);
        }

        [HttpGet("get-lista-msj")]
        public async Task<ActionResult<List<DTShowMensaje>>> GetMsj()
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No existe");
            var buscar =await _context.Mensaje.Include(i=>i.Destino).Include(s=>s.Origen).Where(x=>x.OrigenId == usuario.Id || x.DestinoId == usuario.Id).OrderByDescending(o=>o.FechaCreado).ToListAsync();
            var salida = new List<DTShowMensaje>();
            foreach (var item in buscar)
            {
                var dt = new DTShowMensaje();
                if (item.OrigenId == usuario.Id)
                    dt.NombreOrigen = "Tu";
                else
                    dt.NombreOrigen = item.NombreOrigen;

                if (item.DestinoId == usuario.Id)
                    dt.NombreDestino = "Tu";
                else
                    dt.NombreDestino = item.NombreDestino;
                    
                dt.Contenido= item.Contenido;
                dt.EsNuevo = item.Leido;
                dt.FechaCreado= item.FechaCreado;
                salida.Add(dt);
            }
            
            return Ok(salida);
        }

        [HttpGet("get-destinos")]
        public async Task<IActionResult> GetDestinos()
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No existe");



            return Ok();
        }

        [HttpGet("send-msj")]
        public async Task<IActionResult> SendMsj()
        {
            return Ok();
        }









    }
}
