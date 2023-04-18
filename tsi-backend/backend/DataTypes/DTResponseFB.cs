using System.Text.Json.Serialization;

namespace backend.DataTypes
{
    public class DTResponseFB
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("id")]
        public string IdFB { get; set; }

        [JsonPropertyName("first_name")]
        public string Nombre { get; set; }

        [JsonPropertyName("last_name")]
        public string Apellido { get; set; }
    }
}
//short_name,first_name,last_name,email,id,installed