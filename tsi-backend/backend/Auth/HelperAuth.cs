using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Auth
{
    public class HelperAuth
    {
        public static string HashPassword(string plaintext)
        {
            var salida = new PasswordHasher<object?>().HashPassword(null, plaintext);
            return salida;
        }

        public static bool ValidPassword(string hashed, string password)
        {
            var valid = new PasswordHasher<object?>().VerifyHashedPassword(null, hashed, password);
            if (valid == PasswordVerificationResult.Success)
            {
                return true;
            }
            return false;
        }
        
        public static async Task<Usuario?> IsAdmin(HttpContext http, BackendContext context)
        {
            if (http == null) return null;
            var userId = http.Items["User"];
            if (userId == null) return null;
            var usuario = await context.Usuario.FirstOrDefaultAsync(x => x.Id.ToString() ==userId.ToString());
            if (usuario == null) return null;
            if (usuario.Rol != Enum.Rol.Admin) return null;
            return usuario;
            
        }
        public static async Task<Usuario?> IsUser(HttpContext http, BackendContext context)
        {
            if (http == null) return null;
            var userId = http.Items["User"];
            if (userId == null) return null;
            var usuario = await context.Usuario.FirstOrDefaultAsync(x => x.Id.ToString() == userId.ToString());
            if (usuario == null) return null;
            return usuario;

        }
        public static async Task<Usuario?> IsAdminEmpresarial(HttpContext http, BackendContext context)
        {
            if (http == null) return null;
            var userId = http.Items["User"];
            if (userId == null) return null;
            var usuario = await context.Usuario.FirstOrDefaultAsync(x => x.Id.ToString() == userId.ToString());
            if (usuario == null) return null;
            if (usuario.Rol != Enum.Rol.AdminEmpresarial) return null;
            return usuario;

        }

    }
}
