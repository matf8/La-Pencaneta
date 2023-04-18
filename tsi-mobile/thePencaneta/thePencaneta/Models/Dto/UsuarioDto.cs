namespace thePencaneta.Models {

    public class UsuarioDTO {

        public int id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string Rol { get; set; }

        public UsuarioDTO() { }    

    }
}
