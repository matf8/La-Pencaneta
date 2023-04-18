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

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpresarialesController : ControllerBase
    {
        private readonly BackendContext _context;
        private readonly IMapper _mapper;

        public EmpresarialesController(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Empresariales
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Empresarial>>> GetAllPencaEmpresarial()
        {
            return await _context.PencaEmpresarial.ToListAsync();
        }

        // GET: api/Empresariales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Empresarial>> GetEmpresarial(int id)
        {
            var empresarial = await _context.PencaEmpresarial.FindAsync(id);

            if (empresarial == null)
            {
                return NotFound();
            }

            return empresarial;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Empresarial>>> GetEmpresarial()
        {

            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No encontrado");

            var query = _context.UsuarioPenca.Where(x => x.UsuarioId == usuario.Id).Select(s => s.Penca);
            var salida = await query.OfType<Empresarial>().ToListAsync();
            return Ok(salida);

        }

        // PUT: api/Empresariales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754


        // POST: api/Empresariales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostEmpresarial(DTAddEmpresarial dTEmpresarial)
        {

            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No encontrado");
            
            var torneo = await _context.Torneo.FirstOrDefaultAsync(x => x.Id == dTEmpresarial.TorneoId);
            if (torneo == null) return NotFound("Torneo No Encontrado");

            var clavestorneo = await _context.PencaEmpresarial.FirstOrDefaultAsync(x => x.Clave == dTEmpresarial.Clave);
            if (clavestorneo != null) return BadRequest("Ya existe torneo con esa clave");

            if (dTEmpresarial.Capacidad < 2) return BadRequest("La penca debe tener minimo 2 participantes");


            var empresarial = new Empresarial
            {
                Nombre = dTEmpresarial.Nombre,
                Premios = dTEmpresarial.Premios,
                TorneoId = dTEmpresarial.TorneoId,
                CostoEntrada = dTEmpresarial.CostoEntrada,
                Comision = dTEmpresarial.Comision,
                Theme = dTEmpresarial.Theme,
                ThemeDescripcion = dTEmpresarial.ThemeDescripcion,
                Clave = dTEmpresarial.Clave,
                CreadoPorId = usuario.Id,
                Capacidad = dTEmpresarial.Capacidad,
                Empresa = dTEmpresarial.Empresa
                
            };

            var usuarioPenca = new UsuarioPenca { UsuarioId = usuario.Id, Penca = empresarial };
            

            _context.Update(usuarioPenca);
            try
            {
                await _context.SaveChangesAsync();
                return Ok(empresarial.Id);

            }
            catch
            {
                return BadRequest("Hubo un problema al agregar la Penca Empresarial");
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmpresa(int id, DTModEmpresarial dt)
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No encontrado");

            var penca = await _context.PencaEmpresarial.FirstOrDefaultAsync(x => x.Id == id);
            if (penca == null) return NotFound("Penca Empresarial no encontrada");

            var usuariosEnPenca = await _context.PencaEmpresarial.Select(s => s.usuariosInscriptos).CountAsync();
            if (dt.Capacidad < usuariosEnPenca)
                return BadRequest("no se puede disminuir la capacidad en menos de la actual cantidad de inscritos");

            var auth = await _context.PencaEmpresarial.FirstOrDefaultAsync(x =>
                x.Id == id && x.CreadoPorId == usuario.Id);
            if (auth == null) return NotFound("Solo puede Modificar penca que hayas creado");
            
            

            _mapper.Map(dt,penca);
            _context.Update(penca);
            try
            {
                await _context.SaveChangesAsync();
                return Ok(penca.Id);
            }
            catch
            {
                return BadRequest("Error Modificando Empresa");
            }
            
        }


        [HttpGet("BuscarEmpresa/{Empresa}")]
        public async Task<ActionResult<Empresarial?>> BuscarEmpresa(string Empresa)
        {
            var buscar = await _context.PencaEmpresarial.FirstOrDefaultAsync(x=>x.Empresa == Empresa);
            if (buscar == null) return NotFound("Empresa No encontrada");
            return Ok(buscar);
        }




        private bool EmpresarialExists(int id)
        {
            return _context.PencaEmpresarial.Any(e => e.Id == id);
        }
    }
}
