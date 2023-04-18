using System.Runtime.Serialization;

namespace backend.DataTypes
{
    public class DTFilterSearchEventoDeportivo
    {
        
        public bool? SoloMundial { get; set; } = false;
       
        public bool? SinIniciar { get; set; } = false;

       
        public int?  NumeroDias { get; set; } = null;

    }
}
