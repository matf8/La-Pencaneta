using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.DataTypes
{
    public class DTAddEventoDeportivo
    {
        public string TipoJuego { get; set; }
        public string EquipoA { get; set; }
        public string EquipoB { get; set; }


        [Column(TypeName = "date")]
        public DateTime FechaEvento { get; set; }
        public int TorneoId { get; set; }

    }
}
