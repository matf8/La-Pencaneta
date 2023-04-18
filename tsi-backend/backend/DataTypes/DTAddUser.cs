using System.ComponentModel.DataAnnotations;

namespace backend.DataTypes
{
    public class DTAddUser
    {
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Apellido { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Telefono { get; set; }
        [Required]
        public DateTime Fnac { get; set; }


    }
}
