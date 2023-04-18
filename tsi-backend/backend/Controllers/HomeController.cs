using AutoMapper;
using backend.Auth;
using backend.Data;
using backend.DataTypes;
using backend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Net.WebRequestMethods;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly BackendContext _repo;
        private readonly IAuthService _service;
        private readonly IMapper _mapper;
        private readonly IHttpClientFactory _http;

        public HomeController(BackendContext repo, IAuthService service, IMapper mapper, IHttpClientFactory http)
        {
            _repo = repo;
            _service = service;
            _mapper = mapper;
            _http = http;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticateResponse>> Login(DTLoginUser user)
        {
            var buscar = await _service.Authenticate(user);
            if (buscar == null)
            {
                return NotFound();
            }
            return Ok(buscar);
        }

        [HttpPost("loginFB")]
        public async Task<ActionResult<AuthenticateResponse>> LoginFB(DTLoginTokenFB token)
        {
            var client = _http.CreateClient();
            client.BaseAddress = new Uri("https://graph.facebook.com/");
            try
            {
                var response = await client.GetFromJsonAsync<DTResponseFB>("v15.0/me?fields=first_name,last_name,email,id&access_token=" + token.access_token);
                if (response == null) return BadRequest("Hubo un problema al validar el usuario");
                var usuario = new Usuario();
                if (response.Email != null) usuario = await _repo.Usuario.FirstOrDefaultAsync(x => x.Email == response.Email);
                else usuario = await _repo.Usuario.FirstOrDefaultAsync(x => x.IdFB == response.IdFB);

                if (usuario != null)
                {
                    var salida = await _service.AuthenticateFB(usuario);
                    return Ok(salida);
                }
                else
                {
                    usuario = _mapper.Map<Usuario>(response);
                    _repo.Update(usuario);
                    await _repo.SaveChangesAsync();
                    var salida2 = await _service.AuthenticateFB(usuario);
                    return Ok(salida2);
                }
            }
            catch
            {
                return BadRequest("hubo un problema con este usuario");
            }
        }

        [HttpPost("registro")]
        public async Task<IActionResult> PostUsuario(DTAddUser dT)
        {
            var buscar = await _repo.Usuario.FirstOrDefaultAsync(x => x.Email == dT.Email);
            if (buscar == null)
            {
                var usuario = _mapper.Map<Usuario>(dT);
                usuario.Password = HelperAuth.HashPassword(dT.Password);
                _repo.Usuario.Add(usuario);
                await _repo.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();

        }
        [Authorize]


        [HttpGet("test-login")]
        public IActionResult TestLogin()
        {
            var userId = HttpContext.Items["User"];
            if (userId == null) return BadRequest();

            return Ok(userId.ToString());
        }

        [Authorize]
        [HttpGet("test-admin")]
        public async Task<ActionResult<Usuario?>> TestLoginAdmin()
        {
            var auth = await HelperAuth.IsAdmin(HttpContext, _repo);
            if (auth == null) return BadRequest();
            return Ok(auth);
        }
    }
}
