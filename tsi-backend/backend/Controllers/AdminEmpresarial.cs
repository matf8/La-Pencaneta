using backend.Auth;
using backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminEmpresarial : ControllerBase
    {
        private readonly BackendContext _context;

        public AdminEmpresarial(BackendContext context)
        {
            _context=context;
        }

        [HttpGet("theme")]
        public async Task<IActionResult> GetTheme()
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No existe");

            var salida = await _context.PencaEmpresarial.FirstOrDefaultAsync(x => x.CreadoPorId == usuario.Id);
            if (salida == null) return NotFound("Penca empresarial no existe o no esta asociada a la penca");

            return Ok(salida.Theme);
        }

        [HttpPut("theme/{idtheme}")]
        public async Task<ActionResult<int?>> PutTheme(int idtheme)
        {
            var usuario = await HelperAuth.IsUser(HttpContext, _context);
            if (usuario == null) return NotFound("Usuario No existe");

            var salida = await _context.PencaEmpresarial.FirstOrDefaultAsync(x => x.CreadoPorId == usuario.Id);
            if (salida == null) return NotFound("Penca empresarial no existe o no esta asociada a la penca");
            salida.Theme = idtheme;
            _context.Update(salida);
            try
            {
                await _context.SaveChangesAsync();
                return Ok(salida.Theme);
            }
            catch
            {
                return BadRequest("Problema guardando tema");
            }

        }
    }
}
