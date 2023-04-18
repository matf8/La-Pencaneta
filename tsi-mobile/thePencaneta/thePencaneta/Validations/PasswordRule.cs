using Plugin.ValidationRules.Interfaces;
using System.Linq;

namespace thePencaneta.Validations {

    public class PasswordRule : IValidationRule<string> {

        public string ValidationMessage { get; set; }

        public bool Check(string value) {
            if (value == null) {
                ValidationMessage = "Contraseña requerida.";
                return false;
            }                    

            if (value.Length < 4) {
                ValidationMessage = "Mínimo de caracteres: 4";
                return false;
            }
            
            if (!value.Any(char.IsSymbol) && !value.Any(char.IsPunctuation)) {
                ValidationMessage = "Tu contraseña debe contener al menos un símbolo";
                return false;
            }

            return true;
        }
    }

}
