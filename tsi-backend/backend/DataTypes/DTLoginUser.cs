using System.ComponentModel.DataAnnotations;

namespace backend.DataTypes
{
    public class DTLoginUser
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
