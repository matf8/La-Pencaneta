using System.ComponentModel.DataAnnotations;

namespace backend.DataTypes
{
    public class DTAddForo
    {
        [Required]
        public string? Titulo { get; set; }
        public string? Contenido { get; set; }

    }
}
