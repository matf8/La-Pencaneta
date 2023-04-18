using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Entities;
using AutoMapper;
using backend.Auth;
using backend.DataTypes;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PozoCompartidosController : ControllerBase
    {
        private readonly BackendContext _context;
        private readonly IMapper _mapper;

        public PozoCompartidosController(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/PozoCompartidos
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<PozoCompartido>>> GetAllPencaPozoCompartido()
        {
            return await _context.PencaPozoCompartido.ToListAsync();
        }

        // GET: api/PozoCompartidos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PozoCompartido>> GetPozoCompartido(int id)
        {
            var pozoCompartido = await _context.PencaPozoCompartido.FindAsync(id);

            if (pozoCompartido == null)
            {
                return NotFound();
            }

            return pozoCompartido;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<PozoCompartido>>> GetPencaPozoCompartido()
        {

            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No encontrado");

            //var query = _context.Usuario.Where(x => x.Id == usuario.Id)
            //    .Include(s => s.pencasUsuario).First();
            //var salida = query.pencasUsuario.OfType<PozoCompartido>();
            var query = _context.UsuarioPenca.Where(x=>x.UsuarioId==usuario.Id).Select(s=>s.Penca);
            var salida = await query.OfType<PozoCompartido>().ToListAsync();
            return Ok(salida);
        }

        // PUT: api/PozoCompartidos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        [HttpPut("{id}")]
        private async Task<IActionResult> PutPozoCompartido(int id, PozoCompartido pozoCompartido)
        {
            if (id != pozoCompartido.Id)
            {
                return BadRequest();
            }

            _context.Entry(pozoCompartido).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PozoCompartidoExists(id))
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

        // POST: api/PozoCompartidos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostPozoCompartido(DTAddPencaCompartida dTCompartido)
        {

            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No encontrado");
            var torneo = await _context.Torneo.FirstOrDefaultAsync(x => x.Id == dTCompartido.TorneoId);
            if (torneo == null) return NotFound("Torneo No Encontrado");
            var compartido = new PozoCompartido { Nombre = dTCompartido.Nombre,
                                                    Premios = dTCompartido.Premios,
                                                    TorneoId = dTCompartido.TorneoId,
                                                    PrecioEntrada = dTCompartido.PrecioEntrada,
                                                    CreadoPorId = usuario.Id};
            
            var usuarioPenca = new UsuarioPenca { UsuarioId = usuario.Id ,Penca = compartido};
            //compartido.usuariosInscriptos.Add(usuario);
            //usuario.pencasUsuario.Add(compartido);
            //REVISAR
            
            _context.Update(usuarioPenca);
            try
            {
                await _context.SaveChangesAsync();
                return Ok(compartido.Id);

            } catch
            {
                return BadRequest("Hubo un problema al agregar la Penca Compartida");
            }

        }

        // DELETE: api/PozoCompartidos/5
        // Eliminado
        [HttpDelete("{id}")]
        private async Task<IActionResult> DeletePozoCompartido(int id)
        {
            var pozoCompartido = await _context.PencaPozoCompartido.FindAsync(id);
            if (pozoCompartido == null)
            {
                return NotFound();
            }

            _context.PencaPozoCompartido.Remove(pozoCompartido);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PozoCompartidoExists(int id)
        {
            return _context.PencaPozoCompartido.Any(e => e.Id == id);
        }
    }
}
