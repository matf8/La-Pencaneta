using System;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace thePencaneta {

    public partial class PredictionModule : ContentPage {

        public PredictionModule() {
            InitializeComponent();           
        }

        public void HandleVerEventos(object o, EventArgs e) {
            string pid = Preferences.Get("ActivePencaId", "");
            Navigation.PushModalAsync(new EventList(pid));
        }

        public void HandleMisPredicciones(object o, EventArgs e) {            
            Navigation.PushModalAsync(new PredictionHistory());
        }
    }
}