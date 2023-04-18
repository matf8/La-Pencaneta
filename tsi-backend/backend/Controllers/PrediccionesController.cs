using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Entities;
using AutoMapper;
using backend.Auth;
using backend.DataTypes;
using backend.Enum;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrediccionesController : ControllerBase
    {
        private readonly BackendContext _context;
        private readonly IMapper _mapper;

        public PrediccionesController(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Predicciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prediccion>>> GetPrediccion()
        {
            return await _context.Prediccion.ToListAsync();
        }
        [Authorize]
        [HttpGet("get-by-user")]
        public async Task<ActionResult<IEnumerable<Prediccion>>> GetPrediccionbyUser()
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usario no registrado");
            var salida = await _context.Prediccion.Where(x=>x.UsuarioId==usuario.Id).ToListAsync();
            return Ok(salida);
        }

        [Authorize]
        [HttpGet("get-by-userpenca/{idpenca}")]
        public async Task<ActionResult<IEnumerable<Prediccion>>> GetPrediccionbyUserPenca(int idpenca)
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usario no registrado");
            var penca = await _context.Penca.FirstOrDefaultAsync(x => x.Id == idpenca);
            if (penca == null) return NotFound("Penca no encontrada");
            var salida = await _context.Prediccion
                .Where(x => x.UsuarioId == usuario.Id && x.PencaId == idpenca)
                .ToListAsync();
            return Ok(salida);
        }



        // GET: api/Predicciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Prediccion>> GetPrediccion(int id)
        {
            var prediccion = await _context.Prediccion.FindAsync(id);

            if (prediccion == null)
            {
                return NotFound();
            }

            return prediccion;
        }

        // PUT: api/Predicciones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // Eliminado
        [HttpPut("{id}")]
        private async Task<IActionResult> PutPrediccion(int id, Prediccion prediccion)
        {
            if (id != prediccion.Id)
            {
                return BadRequest();
            }

            _context.Entry(prediccion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrediccionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Predicciones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Prediccion>> PostPrediccion(DTAddPrediccion dTPrediccion)
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usario no registrado");
            var evento = await _context.EventoDeportivo.FindAsync(dTPrediccion.EventoDeportivoId);
            if (evento == null) return NotFound("Evento no registrado");
            if (evento.StatusED == StatusEventoDeportivo.Finalizado)
                return BadRequest("Evento Cerrado no puede cambiar la prediccion");
            
            var penca = await _context.Penca.FindAsync(dTPrediccion.PencaId);
            if (penca == null) return NotFound("Penca no registrada");


            var prediccion = await _context.Prediccion.FirstOrDefaultAsync(x=>x.UsuarioId == usuario.Id && 
                                                                              x.EventoDeportivoId == dTPrediccion.EventoDeportivoId &&
                                                                              x.PencaId == dTPrediccion.PencaId);
            if (prediccion == null)
            {
                prediccion = new Prediccion();
                _mapper.Map(dTPrediccion, prediccion);
                prediccion.UsuarioId = usuario.Id;
            }
            else
            {
                _mapper.Map(dTPrediccion, prediccion);
            }
            
            _context.Update(prediccion);
            try
            {
                await _context.SaveChangesAsync();
                return Ok(prediccion.Id);
            }
            catch
            {
                return BadRequest("Error guardando Prediccion");
            }
        }

        // DELETE: api/Predicciones/5
        // Eliminado
        [HttpDelete("{id}")]
        private async Task<IActionResult> DeletePrediccion(int id)
        {
            var prediccion = await _context.Prediccion.FindAsync(id);
            if (prediccion == null)
            {
                return NotFound();
            }

            _context.Prediccion.Remove(prediccion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PrediccionExists(int id)
        {
            return _context.Prediccion.Any(e => e.Id == id);
        }


    }
}
