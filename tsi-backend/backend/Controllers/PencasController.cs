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
using backend.DataTypes;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PencasController : ControllerBase
    {
        private readonly BackendContext _context;
        private readonly IMapper _mapper;

        public PencasController(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("usuarios-en-penca/{idPenca}")]
        public async Task<ActionResult<IEnumerable<DtShowUserPenca>>> GetUsuariosEnPenca(int idPenca)
        {
            var buscar = await _context.Penca.FindAsync(idPenca);
            if (buscar == null) return NotFound();

            var listaUsuarios = await _context.UsuarioPenca
                .Include(i=>i.Usuario)
                .Where(x => x.PencaId == idPenca).ToListAsync();

            var salida = new List<DtShowUserPenca>();
            foreach (var item in listaUsuarios)
            {
                var userPenca = new DtShowUserPenca();
                userPenca.Id = item.UsuarioId;
                userPenca.Nombre = item.Usuario.Nombre;
                userPenca.Apellido = item.Usuario.Apellido;
                userPenca.Puntaje = item.Puntaje;
                userPenca.Ranking = item.Ranking;
                salida.Add(userPenca);
            }
            return Ok(salida);
        }

        // GET: api/Pencas
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Penca>>> GetPenca()
        {
            return await _context.Penca.ToListAsync();
        }

        // GET: api/Pencas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Penca>> GetPenca(int id)
        {
            var penca = await _context.Penca.FindAsync(id);

            if (penca == null)
            {
                return NotFound();
            }

            return penca;
        }


        /////////// Endpoint Deshabilitados

        // PUT: api/Pencas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        private async Task<IActionResult> PutPenca(int id, Penca penca)
        {
            if (id != penca.Id)
            {
                return BadRequest();
            }

            _context.Entry(penca).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PencaExists(id))
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

        // POST: api/Pencas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        private async Task<ActionResult<Penca>> PostPenca(Penca penca)
        {
            _context.Penca.Add(penca);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPenca", new { id = penca.Id }, penca);
        }

        // DELETE: api/Pencas/5
        [HttpDelete("{id}")]
        private async Task<IActionResult> DeletePenca(int id)
        {
            var penca = await _context.Penca.FindAsync(id);
            if (penca == null)
            {
                return NotFound();
            }

            _context.Penca.Remove(penca);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PencaExists(int id)
        {
            return _context.Penca.Any(e => e.Id == id);
        }
    }
}
