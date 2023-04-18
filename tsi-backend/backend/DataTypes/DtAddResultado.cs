using System.ComponentModel.DataAnnotations;

namespace backend.DataTypes
{
    public class DtAddResultado
    {
        [Required]
        public int EventoDeportivoId { get; set; }
        [Required]
        public int ScoreEquipoA { get; set; }
        [Required]
        public int ScoreEquipoB { get; set; }
    }
}
