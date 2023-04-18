using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Entities {

    public class Torneo {

        public int Id { get; set; }
        public string Nombre { get; set; }
     
        [Column(TypeName = "date")]
        public DateTime FechaInicio { get; set; }

        [Column(TypeName = "date")]
        public DateTime FechaFin { get; set; }
        //todo
        public string? IdRemoto1 { get; set; }
        public string? IdRemoto2 { get; set; }


        [JsonIgnore]
        public List<EventoDeportivo> Eventos = new();

        [JsonIgnore]
        public List<Penca> Pencas = new();

    }
}
