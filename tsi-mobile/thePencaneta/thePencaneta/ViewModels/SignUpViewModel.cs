using Plugin.ValidationRules;
using thePencaneta.Validations;
using System;
using thePencaneta.Models;
using System.Diagnostics;
using System.Threading.Tasks;

namespace thePencaneta {

    public class SignUpViewModel {
               
        public Validatable<string> Nombre { get; set; }
        public string Apellido { get; set; }
        public Validatable<string> Correo { get; set; }
        public Validatable<string> Password { get; set; }
        public DateTime Fecha { get; set; }
        private ValidationUnit _unit1;
        private Requests r;

        public SignUpViewModel() {
            Nombre = new Validatable<string>();
            Correo = new Validatable<string>();
            Password = new Validatable<string>();

            _unit1 = new ValidationUnit(Nombre, Correo, Password);
            r = new Requests();

            AddValidations();
        }

        private void AddValidations() {
            // Name validations
            Nombre.Validations.Add(new IsNotNullOrEmptyRule<string> { ValidationMessage = "Nombre requirido" });

            //Lastname validations
            Password.Validations.Add(new IsNotNullOrEmptyRule<string> { ValidationMessage = "Password requerida" });
            Password.Validations.Add(new PasswordRule());

            //Email validations
            Correo.Validations.Add(new IsNotNullOrEmptyRule<string>{ ValidationMessage = "Email requrido" });
            Correo.Validations.Add(new EmailRule());
        }

        public bool Validate() {
            //var isValidName = _name.Validate();
            //var isValidLastname = _lastname.Validate();
            //var isValidEmail = _email.Validate();

            //return isValidName && isValidLastname && isValidEmail;
            return _unit1.Validate();
        }

        public async Task<bool> SignUp(string n, string a, string c, string p, DateTime f) {
            try {                
                Usuario u = new Usuario {
                    id = 45,
                    Nombre = n,
                    Apellido = a,
                    Email = c,
                    Fnac = f,
                    Password = p,
                };
                Debug.WriteLine(u.ToString());
                return await r.RegistroAPI(u);
            } catch (Exception) {
                throw;
            }
        }       
    }
}