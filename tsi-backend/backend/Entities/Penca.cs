using backend.Enum;
using System.Text.Json.Serialization;

namespace backend.Entities {

    public abstract class Penca {

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Premios { get; set; }

        public int? Capacidad { get; set; }

        public int? CreadoPorId { get; set; }
        [JsonIgnore]
        public Usuario? CreadoPor { get; set; }

        public int? TorneoId { get; set; }

        [JsonIgnore]
        public Torneo Torneo { get; set; }

        [JsonIgnore]
        public List<Prediccion> prediccionesPenca {get;  } = new();

        [JsonIgnore]
        public List<UsuarioPenca> usuariosInscriptos { get;  } = new();
    }
}
