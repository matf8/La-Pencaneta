using thePencaneta.Views;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace thePencaneta { 

    public partial class Logout : ContentPage {

        public Logout() {
            InitializeComponent();
        }

        protected override async void OnAppearing() {
            Preferences.Remove("user");
            Preferences.Remove("logged");
            await Navigation.PopToRootAsync();
            App.Current.MainPage = new NavigationPage(new Router());
        }
    }
}