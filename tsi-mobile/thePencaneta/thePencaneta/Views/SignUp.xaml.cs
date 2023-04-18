using System;
using Xamarin.Forms;

namespace thePencaneta {

    public partial class SignUp : ContentPage {

        private SignUpViewModel _context;

        public SignUp() {
            InitializeComponent();
            _context = new SignUpViewModel();
            BindingContext = _context;
        }

        private async void RegistrarClicked(object sender, EventArgs e) {
            var isValid = _context.Validate();
            if (isValid) {
                var fnacUser = fnac.Date;
                var res = await _context.SignUp(entName.Text, entApellido.Text, entMail.Text, entPass.Text, fnacUser);
                if (res) {
                    await DisplayAlert(":)", "Bienvenido", "TY");
                    await Navigation.PopModalAsync();
                }
                else await DisplayAlert(":(", "Lo sentimos, algo salio mal", "Ok");
            }
            else {
                await DisplayAlert(":(", "Arregle los datos incorrectos", "Ok");
            }
        }

        private void entName_Unfocused(object sender, FocusEventArgs e) {
            _context.Nombre.Validate();
        }

        private void entMail_Unfocused(object sender, FocusEventArgs e)  {
            _context.Correo.Validate();
        }

        private void entPass_Unfocused(object sender, FocusEventArgs e) {
            _context.Password.Validate();
        }
    }
}
