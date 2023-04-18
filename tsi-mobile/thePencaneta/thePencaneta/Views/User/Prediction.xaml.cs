using System;
using thePencaneta.ViewModels;
using Xamarin.Forms;
using System.Diagnostics;
using System.Net.Http;
using thePencaneta.Models.Dto;
using Acr.UserDialogs;
using thePencaneta.Models;

namespace thePencaneta {

    public partial class Prediction : ContentPage {

        private PredictionViewModel _context;
        private string ActivePencaId { get; set; }
        private CardData ActiveEv { get; set; }
        private Requests r;

        public Prediction(Models.CardData ev, string pencaId) {
            InitializeComponent();
            _context = new PredictionViewModel();
            BindingContext = _context;
            ActiveEv = ev;
            imgA.Source = new UriImageSource() { Uri = new Uri(ev.ImgEqA) };
            imgB.Source = new UriImageSource() { Uri = new Uri(ev.ImgEqB) };
            match.Text = ev.HeadLines;
            
            ActivePencaId = pencaId;
            r = new Requests();
        }
                      
        public async void PredecirClicked(object sender, EventArgs e) {
            var dlg = UserDialogs.Instance.Loading("Enviando predicción...", () => {
                UserDialogs.Instance.HideLoading();
            }, "", true, MaskType.Gradient);

            Debug.WriteLine(scoreLocal.Text + scoreVisita.Text + ActiveEv.Id + ActivePencaId);
            PrediccionDTO p = new PrediccionDTO {
                ScoreEquipo1 = Int32.Parse(scoreLocal.Text),
                ScoreEquipo2 = Int32.Parse(scoreVisita.Text),
                EventosDeportivoId = ActiveEv.Id,
                PencaId = Int32.Parse(ActivePencaId)            
            };
            
            HttpResponseMessage res = await r.predictEventAsync(p);
            if (res.IsSuccessStatusCode) { 
                await DisplayAlert("", "Gracias por su predict! Suerte.", "Gracias");
                await Navigation.PushModalAsync(new Menu());
            }
            else {
                await DisplayAlert("", "Hubo un problema con la predicción.", "Ok");                
                string responseString = await res.Content.ReadAsStringAsync();
                Debug.WriteLine(responseString);
            }
            dlg.Dispose();
        }

        private void scoreAUnfocused(object sender, FocusEventArgs e) {
            _context.ScoreA.Validate();
        }

        public void scoreBUnfocused(object sender, FocusEventArgs e) {
            _context.ScoreB.Validate();
        }
    }
}