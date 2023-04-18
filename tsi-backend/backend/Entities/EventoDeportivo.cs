using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using backend.Enum;

namespace backend.Entities {

    public class EventoDeportivo {

        public int Id { get; set; }
        //todo
        public string? TipoJuego { get; set; }
        public string EquipoA { get; set; }
        public string EquipoB { get; set; }
        public int? ScoreEquipoA { get; set; }
        public int? ScoreEquipoB { get; set; }
        public StatusEventoDeportivo StatusED { get; set; } = StatusEventoDeportivo.SinIniciar;

        [Column(TypeName = "date")]
        public DateTime FechaEvento { get; set; }
        //APISPORT //
        public int? LigaId { get; set; }
        public string? LigaLogo { get; set; }
        public string? LigaNombre { get; set; }
        public string? EquipoALogo { get; set; }
        public string? EquipoBLogo { get; set; }
        public int? IdRemoto1 { get; set; }
        public string? IdRemoto2 { get; set; }
        //APISPORT //

        public int TorneoId { get; set; }


        [JsonIgnore]
        public Torneo Torneo { get; set; }

        [JsonIgnore]
        public List<Prediccion> prediccionesEV { get; set; } = new();

    }
}
