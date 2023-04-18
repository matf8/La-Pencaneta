using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Entities;
using backend.Auth;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Runtime.CompilerServices;
using AutoMapper;
using backend.DataTypes;
using backend.Enum;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using ZstdSharp.Unsafe;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly BackendContext _context;
        private readonly IMapper _mapper;

        public UsuariosController(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        
        
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<DTShowUser>>> GetUsuarios()
        {
            var usuarios = await _context.Usuario.ToListAsync();
            var salida = _mapper.Map<List<DTShowUser>>(usuarios);

            return salida;
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<DTShowUser>> GetUsuariobyId(int id)
        {
            //var auth = await HelperAuth.IsAdmin(HttpContext,_context);
            //if (auth == null) return BadRequest("No es Administrador");

            var usuario = await _context.Usuario.FindAsync(id);

            if (usuario == null) return NotFound();
            var salida = _mapper.Map<DTShowUser>(usuario);
            return salida;
        }

        // GET: api/Usuarios
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<DTShowUser>> GetUsuario()
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No encontrado");
            var salida = _mapper.Map<DTShowUser>(usuario);
            var empresa = await _context.PencaEmpresarial.FirstOrDefaultAsync(x => x.CreadoPorId == usuario.Id);
            if (empresa != null)
                salida.Empresa = empresa.Nombre;
            return Ok(salida);
        }

        // PUT: api/Usuarios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutEmpresarial(DTModUsuario dt)
        {

            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No encontrado");

            var buscar = await _context.Usuario.FirstOrDefaultAsync(x => x.Id == usuario.Id);
            _mapper.Map(dt, buscar);
            _context.Update(buscar);
            try
            {
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return BadRequest("Hubo un problema guardando el usuario");
            }

        }

        // POST: api/Usuarios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // Eliminado
        [HttpPost]
        private async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {
            _context.Usuario.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuario", new { id = usuario.Id }, usuario);
        }

        // DELETE: api/Usuarios/5
        // Eliminado
        [HttpDelete("{id}")]
        private async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuario.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuario.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuario.Any(e => e.Id == id);
        }

        [Authorize]
        [HttpPut("add-penca/{idPenca}")]
        public async Task<IActionResult> AddPencaUsuario([Required] int idPenca)
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No existe");

            var empresarial = await _context.PencaEmpresarial.FindAsync(idPenca);
            if (empresarial != null) return BadRequest("No se puede agregar en Penca Empresarial, use su Clave Empresarial");

            var penca = await _context.PencaPozoCompartido.FirstOrDefaultAsync(x=>x.Id == idPenca);
            if (penca == null) return NotFound("Penca Compartida no existe");


            var buscarUsuarioenPenca = await _context.UsuarioPenca.FirstOrDefaultAsync(x => x.UsuarioId == usuario.Id && x.PencaId == penca.Id);
            if (buscarUsuarioenPenca != null) return BadRequest("Usuario ya inscrito en penca compartida");

            var usuarioPenca = new UsuarioPenca{UsuarioId = usuario.Id, Penca = penca};

            _context.Update(usuarioPenca);
            try
            {
                await _context.SaveChangesAsync();
                return Ok("guardado Exitoso");
            }
            catch
            {
                return BadRequest("Hubo un problema al guardar");
            }
        }

        [Authorize]
        [HttpPut("add-penca-empresarial/{clave}")]
        public async Task<IActionResult> AddPencaEmpresarial([Required] string clave)
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No existe");

            var empresarial = await _context.PencaEmpresarial.Include(i => i.usuariosInscriptos).FirstOrDefaultAsync(x=>x.Clave == clave);
            if (empresarial == null) return NotFound("Clave Empresarial No existe");

            var buscarUsuarioenPenca = await _context.UsuarioPenca.FirstOrDefaultAsync(x => x.UsuarioId == usuario.Id && x.PencaId == empresarial.Id);
            if (buscarUsuarioenPenca != null) return BadRequest("Usuario ya inscrito en penca compartida");

            var cantidadInscritos = empresarial.usuariosInscriptos.Count;
            if (cantidadInscritos >= empresarial.Capacidad) return BadRequest("Ya el torneo llego a su capacidad de Inscritos");

            var usuarioPenca = new UsuarioPenca { UsuarioId = usuario.Id, Penca = empresarial , StatusPenca=StatusPenca.InvitadoEmpresarial };
            _context.Update(usuarioPenca);


            try
            {
                await _context.SaveChangesAsync();
                return Ok("guardado Exitoso");
            }
            catch
            {
                return BadRequest("Hubo un problema al guardar");
            }
        }

        [Authorize]
        [HttpGet("get-pencas")]
        public async Task<ActionResult<IEnumerable<Penca>>> GetPencasfromUsuario()
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No existe");



            var salida = await _context.UsuarioPenca.Where(x => x.UsuarioId == usuario.Id).Select(s=> s.Penca).ToListAsync();
            return Ok(salida);
        }

        [Authorize]
        [HttpGet("get-pencas-libres")]
        public async Task<ActionResult<List<Penca>>> GetPencasLibres()
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No existe");

            //var salida = await _context.UsuarioPenca.Where(x => x.UsuarioId == usuario.Id).Select(s => s.Penca).ToListAsync();

            var pencasDeUsuario = await _context.UsuarioPenca.Where(x => x.UsuarioId == usuario.Id).Select(s => s.Penca).ToListAsync();

            var pencas = await _context.PencaPozoCompartido.ToListAsync();

            var salida = new List<Penca>();
            foreach (var item in pencas)
            {
                var existe = pencasDeUsuario.FirstOrDefault(x => x.Id == item.Id);
                if (existe == null) salida.Add(item);
            }

            return Ok(salida);

        }

        [Authorize]
        [HttpGet("get-pencas-libres/{filtro}")]
        public async Task<ActionResult<List<Penca>>> GetPencasLibresFiltro(string filtro)
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No existe");

            //var salida = await _context.UsuarioPenca.Where(x => x.UsuarioId == usuario.Id).Select(s => s.Penca).ToListAsync();

            var pencasDeUsuario = await _context.UsuarioPenca.Where(x => x.UsuarioId == usuario.Id).Select(s => s.Penca).ToListAsync();

            var pencas = await _context.PencaPozoCompartido.ToListAsync();

            var salida = new List<Penca>();
            foreach (var item in pencas)
            {
                var existe = pencasDeUsuario.FirstOrDefault(x => x.Id == item.Id);
                if (existe == null) salida.Add(item);
            }

            var salidafiltrada = salida.Where(x => x.Nombre.Contains(filtro));

            return Ok(salidafiltrada);

        }

        [Authorize]
        [HttpGet("get-pozocompartidos")]
        public async Task<ActionResult<IEnumerable<PozoCompartido>>> GetPozosCompartidosfromUsuario()
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No existe");

            //var query = await _context.Usuario.Where(x => x.Id == usuario.Id).Include(p => p.pencasUsuario).FirstAsync();

            //var salida = query.pencasUsuario.OfType<PozoCompartido>().ToList();
            var query = _context.UsuarioPenca.Where(x => x.UsuarioId == usuario.Id).Select(s => s.Penca);
            var salida = await query.OfType<PozoCompartido>().ToListAsync();

            return Ok(salida);
        }

        [Authorize]
        [HttpGet("get-empresariales")]
        public async Task<ActionResult<IEnumerable<Empresarial>>> GetEmpresarialesfromUsuario()
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No existe");

            //var query = await _context.Usuario.Where(x => x.Id == usuario.Id).Include(p => p.pencasUsuario).FirstAsync();

            //var salida = query.pencasUsuario.OfType<Empresarial>().ToList();
            var query = _context.UsuarioPenca.Where(x => x.UsuarioId == usuario.Id).Select(s => s.Penca);
            var salida = await query.OfType<Empresarial>().ToListAsync();

            return Ok(salida);
        }

        [Authorize]
        [HttpGet("get-eventos-penca-sin-iniciar/{pencaId}")]

        public async Task<ActionResult<List<DTShowEventoDeportivo>?>> GetEventosPorJugar(int pencaId)
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No existe");
            var penca = await _context.Penca.FindAsync(pencaId);
            if (penca == null) return NotFound("Penca No existe");
            var usuariopenca = await _context.UsuarioPenca.FirstOrDefaultAsync(x => x.UsuarioId == usuario.Id && x.PencaId == penca.Id);
            if (usuariopenca == null) return NotFound("Usuario No inscripto en la Penca");
            if (usuariopenca.StatusPenca == StatusPenca.SinTransaciones) return BadRequest("Usuario No a pagado la Penca");
            if (usuariopenca.StatusPenca == StatusPenca.RechazadoPaypal) return BadRequest("Usuario tuvo un problema con Paypal intente pagar nuevamente");

            var torneo = await (from p in _context.Penca
                                        where p.Id == penca.Id
                                        select p.Torneo).FirstOrDefaultAsync();

            if (torneo == null) return NotFound("Torneo No Existe");
            
            var evento = await _context.EventoDeportivo
                                        .Where(x => x.TorneoId == torneo.Id && x.StatusED == StatusEventoDeportivo.SinIniciar)
                                        .ToListAsync();
            var salida = _mapper.Map<List<DTShowEventoDeportivo>>(evento);

            foreach (var item in salida)
            {
                var buscarPrediccion = await _context.Prediccion
                    .FirstOrDefaultAsync(x =>
                        x.EventoDeportivoId == item.Id && x.PencaId == pencaId && x.UsuarioId == usuario.Id);

                if (buscarPrediccion != null)
                {
                    item.TienePreddicion = true;
                    item.PrediccionA = buscarPrediccion.ScoreEquipoA;
                    item.PrediccionB = buscarPrediccion.ScoreEquipoB;
                }
            }

            return Ok(salida);
        }

        [Authorize]
        [HttpGet("get-eventos-penca/{pencaId}")]
        public async Task<ActionResult<List<DTShowEventoDeportivo>>> GetEventosPenca(int pencaId)
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No existe");
            var penca = await _context.Penca.FindAsync(pencaId);
            if (penca == null) return NotFound("Penca No existe");
            var usuariopenca = await _context.UsuarioPenca.FirstOrDefaultAsync(x => x.UsuarioId == usuario.Id && x.PencaId == penca.Id);
            if (usuariopenca == null) return NotFound("Usuario No inscripto en la Penca");

            var torneo = await (from p in _context.Penca
                where p.Id == penca.Id
                select p.Torneo).FirstOrDefaultAsync();

            if (torneo == null) return NotFound("Torneo No Existe");

            var evento = await _context.EventoDeportivo
                .Where(x => x.TorneoId == torneo.Id)
                .ToListAsync();

            var salida = _mapper.Map<List<DTShowEventoDeportivo>>(evento);

            foreach (var item in salida)
            {
                var buscarPrediccion = await  _context.Prediccion
                    .FirstOrDefaultAsync(x =>
                        x.EventoDeportivoId == item.Id && x.PencaId == pencaId && x.UsuarioId == usuario.Id);

                if (buscarPrediccion != null)
                {
                    item.TienePreddicion = true;
                    item.PrediccionA = buscarPrediccion.ScoreEquipoA;
                    item.PrediccionB = buscarPrediccion.ScoreEquipoB;
                }
            }
            return Ok(salida);

        }
    }
}
