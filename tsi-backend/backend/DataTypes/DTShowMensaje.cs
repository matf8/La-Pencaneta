namespace backend.DataTypes
{
    public class DTShowMensaje
    {
        public string? NombreOrigen { get; set; }
        public string? NombreDestino { get; set; }
        public string? Contenido { get; set; }
        public bool? EsNuevo { get; set; }
        public DateTime? FechaCreado { get; set; }
    }
}
