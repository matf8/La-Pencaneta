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
using backend.Auth;
using backend.ApiSport;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoDeportivosController : ControllerBase
    {
        private readonly BackendContext _context;
        private readonly IMapper _mapper;
        private readonly IApiSportService _apiSportService;

        public EventoDeportivosController(BackendContext context, IMapper mapper, IApiSportService apiSportService)
        {
            _context = context;
            _mapper = mapper;
            _apiSportService = apiSportService;

        }

        // GET: api/EventoDeportivos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventoDeportivo>>> GetEventoDeportivo()
        {
            return await _context.EventoDeportivo.ToListAsync();
        }

        // GET: api/EventoDeportivos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EventoDeportivo>> GetEventoDeportivo(int id)
        {
            var eventoDeportivo = await _context.EventoDeportivo.FindAsync(id);

            if (eventoDeportivo == null)
            {
                return NotFound();
            }

            return eventoDeportivo;
        }

        // PUT: api/EventoDeportivos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutEventoDeportivo(int id, DTModScoreEvento dTEvento)
        {
            if (id != dTEvento.Id) return BadRequest("Request Mal creado");

            var evento = await _context.EventoDeportivo.FirstOrDefaultAsync(x=>x.Id == id);
            if (evento == null) return BadRequest("Evento No existe");
            _mapper.Map(dTEvento, evento);
            _context.Update(evento);
            try
            {
                await _context.SaveChangesAsync();
                return Ok(evento.Id);
            }
            catch
            {
                return BadRequest("Error al Modificar Evento");
            }
        }

        // POST: api/EventoDeportivos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostEventoDeportivo(DTAddEventoDeportivo dTAddEvento)
        {
            var usuario = HelperAuth.IsUser(HttpContext, _context);
            var torneo = await _context.Torneo.FirstOrDefaultAsync(x => x.Id == dTAddEvento.TorneoId);
            if (torneo == null) return NotFound("No existe Torneo");
            var evento = _mapper.Map<EventoDeportivo>(dTAddEvento);
            torneo.Eventos.Add(evento);
            _context.Update(torneo);
            try
            {
                await _context.SaveChangesAsync();
                return Ok(evento.Id);
            }
            catch
            {
                return BadRequest("Error creando Evento Deportivo");
            }

        }

        [HttpPost("get-eventos-online")]
        public async Task<ActionResult<List<EventoDeportivo>>> GetEventosDeportivosOnline(DTFilterSearchEventoDeportivo dtFilter)
        {
            var lista = await _apiSportService.GetListaEdSports();
            var query = from l in lista select l;
            if (dtFilter is { SinIniciar: true })
                query = query.Where(x => x.TipoJuego == "Not Started");
            
            if (dtFilter is { SoloMundial: true })
                query = query.Where(x => x.LigaId == 1);
            
            if (dtFilter.NumeroDias > 0)
                query = query.Where(x => x.FechaEvento <= DateTime.Now.AddDays((double)dtFilter.NumeroDias));
            var salida = query.ToList();

            return Ok(salida);
        }

        [HttpPost("add-eventos-online-torneo")]
        public async Task<IActionResult> SetEventosDeportivosOnline(DTAddEventoOnlineTorneo dt)
        {
            var torneo = await _context.Torneo.FirstOrDefaultAsync(x => x.Id == dt.TorneoId);
            if (torneo == null) return NotFound("No existe Torneo");
            var listaEventos = new List<EventoDeportivo>();
            foreach (var item in dt.EventosOnline)
            {

                var evento =await _apiSportService.FindEdSport(item);
                if (evento == null) return BadRequest($"el evento {item} no existe");
                var buscarEventoEnTorneo =
                    await _context.EventoDeportivo.FirstOrDefaultAsync(x => x.TorneoId == dt.TorneoId && x.IdRemoto1 == evento.IdRemoto1);
                if (buscarEventoEnTorneo != null)
                    return BadRequest($"el evento Online {evento.IdRemoto1} ya se encuentra en el torneo {torneo.Nombre} ");
                //if (evento.TipoJuego == "Not Started")
                evento.TorneoId = torneo.Id;

                listaEventos.Add(evento);

            }
            _context.EventoDeportivo.UpdateRange(listaEventos);
            torneo.Eventos.AddRange(listaEventos);
            
            _context.Update(torneo);
            
            try
            {
                await _context.SaveChangesAsync();
                return Ok("Guardado Correcto");
            }
            catch
            {
                return BadRequest("Hubo un problema al guardar los eventos al torneo");
            }
            
        }

        private bool EventoDeportivoExists(int id)
        {
            return _context.EventoDeportivo.Any(e => e.Id == id);
        }

        private async Task<bool> CalcularPuntaje(int id)
        {
            var evento = await _context.EventoDeportivo.Where(x=>x.Id == id).Include(u=>u.prediccionesEV).FirstAsync();

            return true;
        }

        private int DeterminarPuntaje(int e1, int e2)
        {

            return 0;
        }
    }
}
