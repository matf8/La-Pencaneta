using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class Foro
    {
        public int Id { get; set; }

        public string? Titulo { get; set; }
        public string? Contenido { get; set; }
        public DateTime FechaHora { get; set; } = DateTime.UtcNow;
        public int UsuarioForoId { get; set; }
        [JsonIgnore]
        public Usuario UsuarioForo { get; set; }
        public int? OrigenId { get; set; }
        [JsonIgnore]
        public Foro? Origen { get; set; }
    }
}
