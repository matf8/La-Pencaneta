using Plugin.ValidationRules.Interfaces;
using System;
using thePencaneta.Models;
using System.Text.RegularExpressions;

namespace thePencaneta.Validations {

    public class UserRule : IValidationRule<Usuario> {

        public string ValidationMessage { get; set; }

        public bool Check(Usuario value) {
            if (value == null) {
                throw new Exception();
            }

            if (string.IsNullOrEmpty(value.Nombre)) {
                ValidationMessage = "Nombre requrido.";
                return false;
            }

            if (string.IsNullOrEmpty(value.Email)) {
                ValidationMessage = "Email requerido.";
                return false;
            }

            var str = value.Email as string;

            Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            Match match = regex.Match(str);

            if (!match.Success) {
                ValidationMessage = "Correo no es válido";
                return false;
            }
            
            return true;
        }
    }

}
