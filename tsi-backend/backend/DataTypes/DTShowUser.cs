using backend.Enum;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.DataTypes
{
    public class DTShowUser
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }

        public string Telefono { get; set; }
        [Column(TypeName = "date")]
        public DateTime Fnac { get; set; }

        public string Rol { get; set; }
        public string? Empresa { get; set; }

    }
}
