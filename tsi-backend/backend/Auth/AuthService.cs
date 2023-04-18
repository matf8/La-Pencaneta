using backend.Data;
using backend.DataTypes;
using backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Auth
{

    public interface IAuthService
    {
        Task<AuthenticateResponse?> Authenticate(DTLoginUser model);
        Task<AuthenticateResponse?> AuthenticateFB(Usuario usuario);

    }
    public class AuthService : IAuthService
    {
        private readonly AppSettings _settings;
        private readonly BackendContext _context;

        public AuthService(IOptions<AppSettings> settings, BackendContext context)
        {
            _settings = settings.Value;
            _context = context;
        }

        public async Task<AuthenticateResponse?> Authenticate(DTLoginUser model)
        {
            var user = await _context.Usuario.FirstOrDefaultAsync(x => x.Email == model.Email);

            if (user == null) return null;
            if (!HelperAuth.ValidPassword(user.Password, model.Password))
            {
                return null;
            }

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public async Task<AuthenticateResponse?> AuthenticateFB(Usuario usuario)
        {
            var token = generateJwtToken(usuario);
            return new AuthenticateResponse(usuario, token);
        }



        private string generateJwtToken(Usuario user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_settings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

