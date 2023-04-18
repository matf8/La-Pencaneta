using backend.Entities;
using backend.Enum;
using System.Text.Json.Serialization;

namespace backend.Auth
{
    public class AuthenticateResponse
    {

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string? Email { get; set; }
        public string Token { get; set; }
        public string Rol { get; set; }


        public AuthenticateResponse(Usuario user, string token)
        {
            Id = user.Id;
            Nombre = user.Nombre;
            Email = user.Email;
            Token = token;
            Rol = user.Rol.ToString();
        }
    }
}
