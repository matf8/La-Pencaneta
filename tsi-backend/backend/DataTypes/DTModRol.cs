using backend.Enum;
using System.ComponentModel.DataAnnotations;

namespace backend.DataTypes
{
    public class DTModRol
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Rol { get; set; }

    }
}
