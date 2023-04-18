using backend.Enum;

namespace backend.DataTypes
{
    public class DTShowUserEmpresa
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Email { get; set; }
        public Rol Rol { get; set; } = Rol.Participante;
        public int PencaId { get; set; }
        public string? Empresa { get; set; }

    }
}
