namespace backend.DataTypes
{
    public class DTModEmpresarial
    {
        public string Nombre { get; set; }
        public string Premios { get; set; }

        public float CostoEntrada { get; set; }
        public float Comision { get; set; }

        public int Capacidad { get; set; }
        public int Theme { get; set; }
        public string? ThemeDescripcion { get; set; }
        public string? Clave { get; set; }

        public string? Empresa { get; set; }
    }
}
