using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Entities {

    public class Prediccion {

        public int Id { get; set; }
        public int ScoreEquipoA { get; set; }
        public int ScoreEquipoB { get; set; }
      
        public int UsuarioId { get; set; }

        [JsonIgnore]
        public Usuario Usuario { get; set; }

        public int EventoDeportivoId { get; set; }

        [JsonIgnore]
        public EventoDeportivo EventoDeportivo { get; set; }

        public int PencaId { get; set; }

        [JsonIgnore]
        public Penca Penca { get; set; }

        public int Puntaje { get; set; } = 0;

    }
}
