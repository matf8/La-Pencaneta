using Plugin.ValidationRules.Interfaces;
using System.Text.RegularExpressions;

namespace thePencaneta.Validations {

    public class EmailRule : IValidationRule<string> {

        public string ValidationMessage { get; set; } = "El correo no es válido.";

        public bool Check(string value) {

            if (value == null) {
                ValidationMessage = "Email requerido.";
                return false;
            }

            string str = value as string;

            Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            Match match = regex.Match(str);

            if (!match.Success)
                ValidationMessage = "El correo no es válido.";

            return match.Success;
        }
    }
}
