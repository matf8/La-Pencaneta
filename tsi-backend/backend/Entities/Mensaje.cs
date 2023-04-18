namespace backend.Entities
{
    public class Mensaje
    {
        public int Id { get; set; }
        public string Contenido { get; set; }
        public int OrigenId { get; set; }
        public Usuario Origen { get; set; }
        public string NombreOrigen { get; set; } 
        public int? DestinoId { get; set; }
        public Usuario? Destino { get; set; }
        public string NombreDestino { get; set; }

        public bool Leido { get; set; } = false;

        public DateTime FechaCreado { get; set; } = DateTime.Now;
    }
}
