namespace backend.Entities {

    public class Empresarial : Penca {
                 
        public float CostoEntrada { get; set; }
        public float Comision { get; set; }


        public int Theme { get; set; }
        public string? ThemeDescripcion { get; set; }
        public string? Clave { get; set; }

        public string? Empresa { get; set; }
    }
}
