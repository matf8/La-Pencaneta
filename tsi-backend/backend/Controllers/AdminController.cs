using AutoMapper;
using backend.Auth;
using backend.Data;
using backend.DataTypes;
using backend.Entities;
using backend.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using backend.ApiSport;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AdminController : ControllerBase
    {
        private readonly BackendContext _context;
        private readonly IMapper _mapper;
        private readonly IApiSportService _apiSportService;

        public AdminController(BackendContext context, IMapper mapper, IApiSportService apiSportService)
        {
            _context = context;
            _mapper = mapper;
            _apiSportService = apiSportService;
        }

        [HttpPost("buscar-email/{email}")]
        public async Task<ActionResult<DTShowUser>> BuscarUsuarioPorEmail( string email)
        {
            var auth = await HelperAuth.IsAdmin(HttpContext, _context);
            if (auth == null) return BadRequest("Usuario no Admin");

            var buscar = await _context.Usuario.FirstOrDefaultAsync(x => x.Email == email);
            if (buscar == null) return NotFound("Correo no encontrado");
            var salida = _mapper.Map<DTShowUser>(buscar);
            return Ok(salida);
        }

        [HttpGet("buscar-paypal-email/{email}")]
        public async Task<ActionResult<List<TransaccionPaypal>>> GetPaypalbyemail(string email)
        {
            var auth = await HelperAuth.IsAdmin(HttpContext, _context);
            if (auth == null) return BadRequest("Usuario no Admin");

            var salida = await _context.TransaccionPaypal.Where(x => x.Usuario.Email == email).ToListAsync();
            return Ok(salida);
        }

        [HttpGet("get-all-paypal")]
        public async Task<ActionResult<List<TransaccionPaypal>>> GetAllPaypal()
        {
            var auth = await HelperAuth.IsAdmin(HttpContext, _context);
            if (auth == null) return BadRequest("Usuario no Admin");

            var salida = await _context.TransaccionPaypal.ToListAsync();
            if (salida == null) return NotFound();
            return Ok(salida);
        }

        [Authorize]
        [HttpPost("modificar-rol")]
        public async Task<IActionResult> ModRolUsuario(DTModRol dT)
        {
            var auth = await HelperAuth.IsAdmin(HttpContext, _context);
            if (auth == null) return NotFound("usuario No Autorizado");

            var usuario = await _context.Usuario.FirstOrDefaultAsync(x => x.Id == dT.Id);
            if (usuario == null) return NotFound("usuario No encontrado");

            switch (dT.Rol)
            {
                case "Participante":
                    usuario.Rol = Rol.Participante;
                    break;
                case "AdminEmpresarial":
                    usuario.Rol = Rol.AdminEmpresarial;
                    break;
                case "Admin":
                    usuario.Rol = Rol.Admin;
                    break;

                default:
                    return BadRequest("Rol No existe");
            }
            _context.Update(usuario);
            try
            {
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return BadRequest("Problema cambiando Rol");
            }
        }

        [HttpGet("get-user-empresa")]
        public async Task<ActionResult<List<DTShowUserEmpresa>>> ShowUserwithEmpresa()
        {
            var salida = new List<DTShowUserEmpresa>();
            var usuarios = await _context.Usuario.Include(i=>i.Listapencascreadas).ToListAsync();
            foreach (var item in usuarios)
            {
                var guardar = new DTShowUserEmpresa();
                guardar.Id = item.Id;
                guardar.Nombre = item.Nombre;
                guardar.Apellido = item.Apellido;
                guardar.Email = item.Email;
                guardar.Rol = item.Rol;
                if (item.Listapencascreadas.Count == 0)
                {
                    salida.Add(guardar);
                }
                
                if (item.Listapencascreadas.Count > 0)
                {
                    foreach (var pencacreada in item.Listapencascreadas)
                    {
                        var empresa = pencacreada as Empresarial;
                        if (empresa != null)
                        {
                            var guardarEmpresa = _mapper.Map<DTShowUserEmpresa>(guardar);
                            guardarEmpresa.Empresa = empresa.Empresa;
                            guardarEmpresa.PencaId = pencacreada.Id;
                            salida.Add(guardarEmpresa);
                        }

                    }
                }
                
            }

            return Ok(salida);
        }

        [HttpPut("cargar-resultados")]
        public async Task<IActionResult> CargarResultado(DtAddResultado dt)
        {
            try
            {
                await GuardarResultado(dt);
                await LimpiarPuntaje();
                await CalcularPuntajePrediccion();
                await CalcularPuntajeUsuario();
                await CalcularRanking();
                return Ok("Actualizacion Correcta!");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


            
        }

        private async Task GuardarResultado(DtAddResultado dt)
        {
            var evento = await _context.EventoDeportivo.FirstOrDefaultAsync(x => x.Id == dt.EventoDeportivoId);
            if (evento == null) throw new Exception("Evento no encontrado");

            evento.ScoreEquipoA = dt.ScoreEquipoA;
            evento.ScoreEquipoB = dt.ScoreEquipoB;
            evento.StatusED = StatusEventoDeportivo.Finalizado;
            _context.Update(evento);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception("Error Guardando Resultado");
            }

        }

        private async Task CalcularRanking()
        {
            //var usuariopenca = await _context.UsuarioPenca.Include(i => i.Penca).ToListAsync();

            var pencas = await _context.Penca.Include(i=>i.usuariosInscriptos).ToListAsync();
            foreach (var item in pencas)
            {
                var listaordenada = item.usuariosInscriptos.OrderByDescending(o => o.Puntaje);
                var inicio = 1;
                foreach (var itemlista in listaordenada)
                {
                    itemlista.Ranking = inicio;
                    inicio++;
                    _context.Update(itemlista);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception("Error calculando Ranking");
            }

        }
        private async Task CalcularPuntajeUsuario()
        {
            var predicciones = await _context.Prediccion
                .Where(x=>x.Puntaje > 0)
                .ToListAsync();

            foreach (var item in predicciones)
            {
                var userpenca = await _context.UsuarioPenca.FirstOrDefaultAsync(x =>
                    x.PencaId == item.PencaId && x.UsuarioId == item.UsuarioId);
                if (userpenca != null)
                {
                    userpenca.Puntaje += item.Puntaje;
                    _context.Update(userpenca);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception("Error Calculando Puntaje Usuario");
            }

        }

        private async Task CalcularPuntajePrediccion()
        {
            var eventoPrediccion = await _context.Prediccion
                .Include(i=>i.EventoDeportivo)
                .Where(x=>x.EventoDeportivo.StatusED== StatusEventoDeportivo.Finalizado)
                .ToListAsync();

            foreach (var item in eventoPrediccion)
            {
                item.Puntaje = new DTCalcularPuntaje(item.EventoDeportivo.ScoreEquipoA,
                    item.EventoDeportivo.ScoreEquipoB, item.ScoreEquipoA, item.ScoreEquipoB).Calcular();
            }
            _context.UpdateRange(eventoPrediccion);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception("Problema CalculandoPrediccion");
            }
        }


        private async Task LimpiarPuntaje()
        {
            var predicciones = await _context.Prediccion.ToListAsync();
            foreach (var item in predicciones)
            {
                item.Puntaje = 0;
            }
            _context.UpdateRange(predicciones);

            var usuariospenca = await _context.UsuarioPenca.ToListAsync();
            foreach (var item in usuariospenca)
            {
                item.Puntaje = 0;
                item.Ranking = 0;
            }
            _context.UpdateRange(usuariospenca);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                throw new Exception("Problema Limpiando Mensaje");
            }
        }

    }
}
