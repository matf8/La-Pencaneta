using Plugin.ValidationRules.Interfaces;
using System;
using thePencaneta.Models;
using System.Text.RegularExpressions;

namespace thePencaneta.Validations {

    public class PredictionRule : IValidationRule<string> {

        public string ValidationMessage { get; set; }

         public bool Check(string value) {
            if (string.IsNullOrEmpty(value)) {
                ValidationMessage = "Score requrido.";
                return false;
            }

            if (string.IsNullOrEmpty(value)) {
                ValidationMessage = "Score requerido.";
                return false;
            }

            Regex regex = new Regex("^[0-9]*$");
            Match match = regex.Match(value);

            if (!match.Success) {
                ValidationMessage = "Score debe ser número";
                return false;
            }              

            return true;
        }

    }
}
