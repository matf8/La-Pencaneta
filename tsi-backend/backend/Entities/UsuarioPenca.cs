using backend.Enum;
using System.Text.Json.Serialization;

namespace backend.Entities
{

    public class UsuarioPenca
    {
        public int UsuarioId { get; set; }
        public int PencaId { get; set; }

        [JsonIgnore]
        public Usuario Usuario { get; set; }

        [JsonIgnore]
        public Penca Penca { get; set; }

        public int Puntaje { get; set; } = 0;
        public int Ranking { get; set; } = 0;

        public StatusPenca StatusPenca { get; set; } = StatusPenca.SinTransaciones;
    }
}
