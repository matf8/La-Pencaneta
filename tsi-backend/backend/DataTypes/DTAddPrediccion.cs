using System.ComponentModel.DataAnnotations;

namespace backend.DataTypes
{
    public class DTAddPrediccion
    {

        [Required]
        public int ScoreEquipoA { get; set; }

        [Required]
        public int ScoreEquipoB { get; set; }

        [Required]
        public int EventoDeportivoId { get; set; }
        [Required]
        public int PencaId { get; set; }

    }
}
