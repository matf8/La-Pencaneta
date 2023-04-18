using System.ComponentModel.DataAnnotations;

namespace backend.DataTypes
{
    public class DTAddEventoOnlineTorneo
    {
        [Required]
        public int TorneoId { get; set; }
        [Required]
        public List<int> EventosOnline { get; set; }


    }
}
