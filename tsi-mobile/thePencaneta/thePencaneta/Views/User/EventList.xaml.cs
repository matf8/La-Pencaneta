using System.Collections.Generic;
using thePencaneta.Models;
using thePencaneta.ViewModels;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace thePencaneta {

    public partial class EventList : ContentPage {

        public List<SportEvent> evList { get; set; }
        public Requests r = new Requests();
        private string ActivePencaId { get; set; }

        public EventList() {
            InitializeComponent();
            BindingContext = new CardDataViewModel();        
        }

        public EventList(string pencaId) {
            InitializeComponent();
            BindingContext = new CardDataViewModel();
            ActivePencaId = pencaId;       
        }

        public async void VerEvent(object sender, ItemTappedEventArgs e) {
            CardData item = e.Item as CardData;

            if (item == null)
                return;

            await Navigation.PushModalAsync(new Prediction(item, ActivePencaId));

        }          
    }
}
