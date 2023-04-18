using backend.Enum;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Entities {

    public class Usuario {

        public int Id { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? IdFB { get; set; }

        public string? IdMongo { get; set; }

        public string? Telefono { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Fnac { get; set; }

        public Rol Rol { get; set; } = Rol.Participante;

        [JsonIgnore]

        public List<Prediccion> PrediccionesUsuario { get; set; } = new();

        [JsonIgnore]
        public List<UsuarioPenca> PencasUsuario { get; } = new();

        [JsonIgnore]
        public List<TransaccionPaypal> TransaccionesPaypal { get; set; } = new();

        [JsonIgnore]
        [InverseProperty("UsuarioForo")]
        public List<Foro> Foro { get; } = new();

        [JsonIgnore]
        [InverseProperty("CreadoPor")]
        public List<Penca> Listapencascreadas { get; } = new();

        [JsonIgnore]
        [InverseProperty("Origen")]
        public List<Mensaje> MensajeEnviado { get; } = new();

        [JsonIgnore]
        [InverseProperty("Destino")]
        public List<Mensaje> MensajeRecibido { get; } = new();



    }
}
