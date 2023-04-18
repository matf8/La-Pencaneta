using System;
using Xamarin.Forms;
using thePencaneta.ViewModels;
using System.Diagnostics;
using Newtonsoft.Json;
using Xamarin.Essentials;
using Acr.UserDialogs;

namespace thePencaneta {

    public partial class Login : ContentPage {

        private LoginViewModel _context;

        public Login() {
            InitializeComponent();
            _context = new LoginViewModel();
            BindingContext = _context;
        }

        public async void LoginClicked(object sender, EventArgs e) {
            var dlg = UserDialogs.Instance.Loading("Iniciando sesión...", () => {
                UserDialogs.Instance.HideLoading();              
            }, "", true, MaskType.Gradient);
            try { 
                Models.UsuarioDTO usertry = await _context.Login(entUser.Text, entPass.Text);
                if (usertry != null) { 
                    await DisplayAlert("", "Bienvenido!", "Ok");
                    Preferences.Set("user", JsonConvert.SerializeObject(usertry));
                    Preferences.Set("logged", true);
                    await Navigation.PushModalAsync(new Menu());
                } else {
                    await DisplayAlert("", "Error al iniciar sesión", "Ok"); 
                }
            } catch (Exception ex) {
                await DisplayAlert("", "Error al iniciar sesión", "Ok");
                Debug.WriteLine(ex.ToString());
            }
            dlg.Dispose();
        }

        private void entCorreo_Unfocused(object sender, FocusEventArgs e) {
            _context.email.Validate();
        }

        public async void FocusNext(object sender, EventArgs e) {
            entPass.Focus();
        }
    }
}
