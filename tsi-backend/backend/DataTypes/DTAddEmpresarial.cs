using System.ComponentModel.DataAnnotations;

namespace backend.DataTypes
{
    public class DTAddEmpresarial
    {
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Premios { get; set; }
        [Required]
        public int? TorneoId { get; set; }

        [Required]
        public float CostoEntrada { get; set; }
        [Required]
        public float Comision { get; set; }
        
        [Required]
        public int Capacidad { get; set; }

        public string? ThemeDescripcion { get; set; }

        public string? Clave { get; set; }

        public int Theme { get; set; }

        [Required]
        public string? Empresa { get; set; }
    }
}
