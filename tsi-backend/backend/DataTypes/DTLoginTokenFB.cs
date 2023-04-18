using System.ComponentModel.DataAnnotations;

namespace backend.DataTypes
{
    public class DTLoginTokenFB
    {
        [Required]
        public string access_token { get; set; }
    }
}
