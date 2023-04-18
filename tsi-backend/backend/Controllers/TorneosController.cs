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
    public class TorneosController : ControllerBase
    {
        private readonly BackendContext _context;
        private readonly IMapper _mapper;

        public TorneosController(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Torneos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Torneo>>> GetTorneo()
        {
            return await _context.Torneo.ToListAsync();
        }

        // GET: api/Torneos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Torneo>> GetTorneo(int id)
        {
            var torneo = await _context.Torneo.FindAsync(id);

            if (torneo == null)
            {
                return NotFound();
            }

            return torneo;
        }

        // GET: api/Torneos/5
        [HttpGet("buscar/{nombre}")]
        public async Task<ActionResult<Torneo>> GetTorneoPorNombre(string nombre)
        {
            var torneo = await _context.Torneo.FirstOrDefaultAsync(x => x.Nombre.Trim() == nombre.Trim());

            if (torneo == null)
            {
                return NotFound();
            }

            return Ok(torneo);
        }

        [HttpGet("eventos-en-torneo/{id}")]
        public async Task<ActionResult<List<EventoDeportivo>>> GetEventosEnTorneo(int id)
        {
            var buscar = await _context.EventoDeportivo.Where(x=>x.TorneoId == id).ToListAsync();
            return Ok(buscar);
        }

        // PUT: api/Torneos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        private async Task<IActionResult> PutTorneo(int id, Torneo torneo)
        {
            if (id != torneo.Id)
            {
                return BadRequest();
            }

            _context.Entry(torneo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TorneoExists(id))
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

        // POST: api/Torneos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Torneo>> PostTorneo(DTAddTorneo DTtorneo)
        {
            var torneo = _mapper.Map<Torneo>(DTtorneo);
            _context.Torneo.Add(torneo);
            await _context.SaveChangesAsync();

            return Ok(torneo.Id);
        }

        // DELETE: api/Torneos/5
        // Elimindado
        [HttpDelete("{id}")]
        private async Task<IActionResult> DeleteTorneo(int id)
        {
            var torneo = await _context.Torneo.FindAsync(id);
            if (torneo == null)
            {
                return NotFound();
            }

            _context.Torneo.Remove(torneo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TorneoExists(int id)
        {
            return _context.Torneo.Any(e => e.Id == id);
        }
    }
}
