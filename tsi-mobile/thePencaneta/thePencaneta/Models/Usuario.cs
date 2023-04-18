using System;

namespace thePencaneta.Models {

    public class Usuario {

        public int id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public DateTime Fnac { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Telefono { get; set; }

        public override string ToString() {
            return
                "id: " + id +
                "\nNombre: " + Nombre +
                "\nApellido: " + Apellido +
                "\nFnac: " + Fnac +
                "\nEmail: " + Email +
                "\nEmail: " + Email +
                "\nPassword: " + Password +
                "\nTelefono: " + Telefono;
        }
    }

}
