using Acr.UserDialogs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using thePencaneta.Models;
using Xamarin.Essentials;

namespace thePencaneta.ViewModels {

    public class CardDataViewModel {

        public IList<CardData> CardDataCollection { get; set; }
        public Requests r { get; set; }
        public List<SportEvent> evList { get; set; }
        public object SelectedItem { get; set; }

        public CardDataViewModel() {
            r = new Requests();
            CardDataCollection = new List<CardData>();
            GenerateCardModel();
        }

        private async void GenerateCardModel() {
            var dlg = UserDialogs.Instance.Loading("Cargando eventos...", () => {
                UserDialogs.Instance.HideLoading();
            }, "", true, MaskType.Gradient);

            CardDataCollection = new ObservableCollection<CardData>();
            string SpencaId = Preferences.Get("ActivePencaId", "");
            if (SpencaId != "") {
                var response = await r.GetEventosDeportivos(Int32.Parse(SpencaId));
                if (response.IsSuccessStatusCode) {
                    var data = await response.Content.ReadAsStringAsync();
                    var allEvents = JsonConvert.DeserializeObject<List<SportEvent>>(data);
                    evList = allEvents;
                } else Debug.WriteLine("none");
            } else Debug.WriteLine("penca null");

            evList.ForEach(x => {
                CardData ev = new CardData {
                    Id = x.Id,
                    HeadTitle = x.LigaNombre + "\n" + x.FechaEvento.ToString().Split(" ")[0],
                    HeadLines = x.EquipoA + " VS " + x.EquipoB,
                    ImgEqA = x.EquipoALogo,
                    ImgEqB = x.EquipoBLogo,
                    HeadLinesDesc = x.StatusED.ToString() == "Finalizado" ? "Resultado: " + x.ScoreEquipoA + " - " + x.ScoreEquipoB
                    : x.StatusED.ToString() == "SinIniciar" ? "Sin iniciar"
                    : x.StatusED.ToString(),
                    HeadLineBot = x.TienePreddicion ? "Tu predicción: " + x.PrediccionA + " - " + x.PrediccionB : ""
                };               
                CardDataCollection.Add(ev);
            });
            dlg.Dispose();
        }        
    }
}