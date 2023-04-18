using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Entities;
using backend.DataTypes;
using AutoMapper;
using backend.Auth;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForoController : ControllerBase
    {
        private readonly BackendContext _context;
        private readonly IMapper _mapper;

        public ForoController(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Foro
        [HttpGet("All")]
        public async Task<ActionResult<IEnumerable<Foro>>> GetAllPost()
        {
            return await _context.Foro.ToListAsync();
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Foro>>> GetTitulosForo()
        {
            var foro = await _context.Foro.Where(x=>x.OrigenId==null).OrderBy(x => x.FechaHora).ToListAsync();
            return Ok(foro);
        }

        // GET: api/Foro/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Foro>>> GetForo(int id)
        {
            var foro = await _context.Foro.Where(x=>x.OrigenId==id || x.Id == id).OrderBy(x=>x.FechaHora).ToListAsync();

            if (foro == null)
            {
                return NotFound("Foro No encontrado");
            }

            return Ok(foro);
        }

        [Authorize]
        [HttpPost("crear-foro")]
        public async Task<IActionResult> CrearForo(DTAddForo dT)
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No encontrado");

            var foro = _mapper.Map<Foro>(dT);
            foro.UsuarioForoId = usuario.Id;
            _context.Foro.Update(foro);
            try
            {
                await _context.SaveChangesAsync();
                return Ok(foro.Id);
            }
            catch
            {
                return BadRequest("Error Creando Foro");
            }
            
        }

        [Authorize]
        [HttpPost("crear-comentario")]
        public async Task<IActionResult> CrearComentario(DTAddForoComentario dT)
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No encontrado");

            var foro = await _context.Foro.FindAsync(dT.OrigenId);
            if (foro == null) return NotFound("Foro No encontrado");

            var comentario = new Foro { Contenido = dT.Contenido,
                                        UsuarioForoId = usuario.Id,
                                        OrigenId = dT.OrigenId
                                };

            _context.Foro.Update(comentario);
            try
            {
                await _context.SaveChangesAsync();
                return Ok(comentario.Id);
            }
            catch
            {
                return BadRequest("Error Creando Comentario");
            }

        }


        // PUT: api/Foro/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        private async Task<IActionResult> PutForo(int id, Foro foro)
        {
            if (id != foro.Id)
            {
                return BadRequest();
            }

            _context.Entry(foro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ForoExists(id))
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

        // POST: api/Foro
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        private async Task<ActionResult<Foro>> PostForo(Foro foro)
        {
            _context.Foro.Add(foro);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetForo", new { id = foro.Id }, foro);
        }

        // DELETE: api/Foro/5
        [HttpDelete("{id}")]
        private async Task<IActionResult> DeleteForo(int id)
        {
            var foro = await _context.Foro.FindAsync(id);
            if (foro == null)
            {
                return NotFound();
            }

            _context.Foro.Remove(foro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ForoExists(int id)
        {
            return _context.Foro.Any(e => e.Id == id);
        }
    }
}
