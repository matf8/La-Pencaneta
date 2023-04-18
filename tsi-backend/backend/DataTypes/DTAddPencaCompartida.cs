using System.ComponentModel.DataAnnotations;

namespace backend.DataTypes
{
    public class DTAddPencaCompartida
    {
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Premios { get; set; }
        [Required]
        public float PrecioEntrada { get; set; }

        [Required]
        public int TorneoId { get; set; }
        [Required]
        public int Capacidad { get; set; }


    }
}
