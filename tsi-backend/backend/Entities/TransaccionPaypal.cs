using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class TransaccionPaypal
    {
        public int Id { get; set; }

        public string MongoId { get; set; }
        public string? Status { get; set; }
        public float? Monto { get; set; }

        public int UsuarioId { get; set; }

        [JsonIgnore]
        public Usuario Usuario { get; set; }

        public int? PencaId { get; set; }

        [JsonIgnore]
        public Penca Penca { get; set; }



    }
}
