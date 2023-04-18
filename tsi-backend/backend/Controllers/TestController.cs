using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using backend.ApiSport;
using backend.Data;
using backend.DataTypes;
using backend.Entities;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver.Linq;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly BackendContext _context;
        private readonly IApiSportService _apiSport;

        public TestController(BackendContext context, IApiSportService apiSport)
        {
            _context = context;
            _apiSport = apiSport;
        }

        [HttpGet("UsuarioPenca")]
        public async Task<ActionResult<IEnumerable<UsuarioPenca>>> TestUP()
        {
            var salida = await _context.UsuarioPenca.ToListAsync();
            return Ok(salida);
        }



        [HttpGet("UpgradeMongo")]
        public async Task<IActionResult> GetUpgradeMongo()
        {
            var salida =await _apiSport.UpgradeApiSport();
            return Ok(salida);
        }


        [HttpGet("EventoMasReciente")]
        public async Task<IActionResult> EventoMasReciente()
        {
            var test = await _apiSport.GetProximoEvento();
            return Ok(test);
        }
        [HttpGet("EventoRecienCulminado")]
        public async Task<IActionResult> EventoRecienCulminado()
        {
            var test = await _apiSport.GetEventoRecienFinalizado();
            return Ok(test);
        }

        [HttpGet("GetListaEventosDeportivos")]
        public async Task<IActionResult> GetListaEventosDeportivos()
        {
            var fecha = DateTime.Now.AddMonths(1);
            var test = await _apiSport.GetListaEdSports();
            var salida = test.Where(x => x.FechaEvento < fecha).OrderByDescending(o=>o.FechaEvento).ToList();
            return Ok(salida);
        }



        [HttpGet("apisportTimeZones")]
        public async Task<ActionResult<string?>> TestapisportTimeZones()
        {
            var salida = await _apiSport.GetTestTZ();
            return Ok(salida);
        }

        [HttpGet("apisportLeagues")]
        public async Task<ActionResult<string?>> TestapisportLeagues()
        {
            var salida = await _apiSport.GetTestLeagues();
            return Ok(salida);
        }

        [HttpGet("apisportStatus")]
        public async Task<ActionResult<string?>> TestapisportStatus()
        {
            var salida = await _apiSport.GetTestStatus();
            return Ok(salida);
        }

        [HttpGet("apisportFictures/{id}")]
        public async Task<ActionResult<DTApiSportResponse?>> TestapisportFixtures([Required] int id)
        {
            var salida = await _apiSport.GetESport(id);
            return Ok(salida);
        }

        [HttpPost("PruebaResultado")]
        public IActionResult TestResultado(DTCalcularPuntaje dt)
        {

            return Ok(dt.Calcular());
        }

        /*
        [HttpGet("apisportString")]
        public async Task<ActionResult<string?>> TestapisportString()
        {
            var salida = await _apiSport.GetTestString();
            return Ok(salida);
        }




        [HttpGet("apisportCountries")]
        public async Task<ActionResult<string?>> TestapisportCountries()
        {
            var salida = await _apiSport.GetTestCountries();
            return Ok(salida);
        }



        [HttpGet("apisportPrediction/{id}")]
        public async Task<ActionResult<string?>> TestapisportPredictions([Required] int id)
        {
            var salida = await _apiSport.GetTestPrediccion(id);
            return Ok(salida);
        }
        */
    }
}
