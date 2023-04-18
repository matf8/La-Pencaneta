using System;
using Xamarin.Forms;

namespace thePencaneta.Views {

    public partial class Router : ContentPage {

        public Router() {
            InitializeComponent();
        }
               
        protected override void OnAppearing() {    
            
        }  

        private void SignUp_Clicked(object sender, EventArgs e) {
            Navigation.PushModalAsync(new SignUp());
        }

        private void Login_Clicked(object sender, EventArgs e) {
            Navigation.PushModalAsync(new Login());
        }

       // private void notiClicked(object sender, EventArgs e) {
           // Navigation.PushModalAsync(new NotiOptions());
       // }

        protected override bool OnBackButtonPressed() {                      
             return base.OnBackButtonPressed();       

        }     
    }

}