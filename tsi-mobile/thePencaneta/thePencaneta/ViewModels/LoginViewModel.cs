using Plugin.ValidationRules;
using System.Diagnostics;
using System.Threading.Tasks;
using thePencaneta.Validations;

namespace thePencaneta.ViewModels {

    public class LoginViewModel {

        public Validatable<string> email { get; set; }
        public string password { get; set; }
        private ValidationUnit _unit2;
        private Requests r;
   

        public LoginViewModel() {
            email = new Validatable<string>();
            _unit2 = new ValidationUnit(email);
            r = new Requests();
            AddValidations();
        }

        public async Task<Models.UsuarioDTO> Login(string user, string password) {
          //  if (email.Error == null) {                
                // connect to api/login y return token con user y rol
                Models.UsuarioDTO ret = await r.LoginAPI(user, password);
                return ret;
          //  }
          //  return null;
        }

        private void AddValidations() { 
            //Email validations
            email.Validations.Add(new IsNotNullOrEmptyRule<string> { ValidationMessage = "Email requrido" });
            email.Validations.Add(new EmailRule());
        }

        public bool Validate() {
            //var isValidName = _name.Validate();
            //var isValidLastname = _lastname.Validate();
            //var isValidEmail = _email.Validate();

            //return isValidName && isValidLastname && isValidEmail;
            return _unit2.Validate();
        }
    }
}

