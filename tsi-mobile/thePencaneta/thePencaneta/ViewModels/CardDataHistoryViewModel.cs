using Acr.UserDialogs;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Threading.Tasks;
using thePencaneta.Models;
using thePencaneta.Models.Dto;

namespace thePencaneta.ViewModels {

    public class CardDataHistoryViewModel {

        public IList<CardData> CardDataCollection { get; set; }
        public Requests r { get; set; }
        public List<_Prediction> history { get; set; }
        public object SelectedItem { get; set; }

        public CardDataHistoryViewModel() {
            r = new Requests();
            CardDataCollection = new List<CardData>();
            GenerateCardModel();
        }

        private async void GenerateCardModel() {
            var dlg = UserDialogs.Instance.Loading("Cargando predicciones...", () => {
                UserDialogs.Instance.HideLoading();
            }, "", true, MaskType.Gradient);

            CardDataCollection = new ObservableCollection<CardData>();
            var response = await r.GetHistoryPredicctions();
            if (response.IsSuccessStatusCode) {
                var data = await response.Content.ReadAsStringAsync();
                var predictions = JsonConvert.DeserializeObject<List<_Prediction>>(data);
                history = predictions;               
            } else Debug.WriteLine("none");

            if (history.Count > 0) { 
                history.ForEach(async x => {
                    var res = await r.GetEvento(x.EventoDeportivoId);
                    if (res.IsSuccessStatusCode) {
                        var d = await res.Content.ReadAsStringAsync();
                        SportEventDTO evento = JsonConvert.DeserializeObject<SportEventDTO>(d);
                        string pencaName = await getPencaName(x.PencaId);
                        if (evento != null) {
                            CardData ev = new CardData {
                                Id = x.Id,
                                HeadTitle = evento.LigaNombre + "\n" + evento.FechaEvento.ToString().Split(" ")[0],
                                HeadTitlePenca = pencaName,
                                HeadLines = evento.EquipoA + " VS " + evento.EquipoB,
                                ImgEqA = evento.EquipoALogo,
                                ImgEqB = evento.EquipoBLogo,
                                HeadLinesDesc = evento.StatusED.ToString() == "Finalizado" ? "Resultado: " + evento.ScoreEquipoA.ToString() + " - " + evento.ScoreEquipoB.ToString() + "\n\n\tTu predicción: " + x.ScoreEquipoA + " - " + x.ScoreEquipoB
                                : evento.StatusED.ToString() == "SinIniciar" ? "Sin iniciar" + "\n\n\tTu predicción: " + x.ScoreEquipoA + " - " + x.ScoreEquipoB : "",
                                HeadLineBot = evento.StatusED.ToString() == "Finalizado" ? "Puntaje: " + x.Puntaje.ToString() : "",
                                PictureBotRanked = x.Puntaje == 3 ? "ok.png" : x.Puntaje == 5 ? "nice.png" : x.Puntaje == 8 ? "perfect.png" : evento.StatusED.ToString() == "Finalizado" && x.Puntaje == 0 ? "cero.png" : "",
                            };
                            CardDataCollection.Add(ev);                           
                        } else Debug.WriteLine("Evento null");
                    }               
                });                   
                dlg.Dispose();
            } else Debug.WriteLine("history 0");
        } 
        

        private async Task<string> getPencaName(int pencaId) {
            List<HomePageViewModel> l = await listPencas();
            return l.Find((x) => x.Id == pencaId).Nombre; 
        }       
             
        private async Task<List<HomePageViewModel>> listPencas() {
            List<HomePageViewModel> ret = new List<HomePageViewModel>();
            var response = await r.GetPencasPublicasUsuarioAPI();

            if (response.IsSuccessStatusCode) {
                var data = await response.Content.ReadAsStringAsync();
                var pencasJson = JsonConvert.DeserializeObject<List<HomePageViewModel>>(data);
                ret = pencasJson;          
            }

            response = await r.GetPencasEmpresarialesAPI();

            if (response.IsSuccessStatusCode) {
                var data = await response.Content.ReadAsStringAsync();
                var pencasJson = JsonConvert.DeserializeObject<List<HomePageViewModel>>(data);
                if (ret.Count > 0)
                    pencasJson.ForEach(x => ret.Add(x));
                else ret = pencasJson;
            }

            return ret;
        }
    }
}