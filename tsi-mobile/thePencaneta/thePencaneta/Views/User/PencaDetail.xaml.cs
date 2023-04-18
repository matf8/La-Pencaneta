using System.Diagnostics;
using System;
using Xamarin.Forms;
using System.Collections.Generic;
using Xamarin.Essentials;
using Newtonsoft.Json;
using thePencaneta.Models;
using System.Linq;

namespace thePencaneta {

    public partial class PencaDetail : ContentPage {

        public List<RankingViewModel> rkList = new List<RankingViewModel>();
        private RankingViewModel RankingContext { get; set; }
        private string ActivePencaId { get; set; }
        private Requests r { get; set; }

        public PencaDetail() { }

        public PencaDetail(string nombre, string id) {
            InitializeComponent();
            RankingContext = new RankingViewModel();
            BindingContext = RankingContext;
            r = new Requests();
            ActivePencaId = id;
            lbPencaId.Text = id;
            lbPencaNombre.Text = nombre;
            GetRankings();
        }

        public async void GetRankings() {
            var response = await r.GetRanking(Int32.Parse(ActivePencaId));

            if (response.IsSuccessStatusCode) {

                var data = await response.Content.ReadAsStringAsync();
                var rankings = JsonConvert.DeserializeObject<List<Standings>>(data);

                if (rankings != null && rankings.Count > 0) {
                    rankings.ForEach(x => {
                        RankingViewModel sp = new RankingViewModel(x.Ranking.ToString(), x.Puntaje.ToString(), x.Nombre);
                        rkList.Add(sp);
                    });
                    Debug.WriteLine(rkList.Count);
                    rkList.OrderBy(x => x.Posicion);
                    var res = from r in rkList
                              orderby r.Posicion
                              ascending
                              select r;
                    ranking.ItemsSource = res;
                }      
            }           
        }

        public async void AgregarEvent(object sender, EventArgs e) {
            await Navigation.PushModalAsync(new EventList(ActivePencaId));
        }

        private async void GoEvents(object sender, EventArgs e) {
            string pencaId = lbPencaId.Text;
            if (pencaId != "") {
                Preferences.Set("ActivePencaId", pencaId);
                Preferences.Set("ActiveTournament", lbPencaId.Text);
                await Navigation.PushModalAsync(new EventList(pencaId));
            }
            else await Navigation.PushModalAsync(new EventList(null));
        }

        private void ToggleRanking(object sender, EventArgs e) {
            rankingGrid.IsVisible = !rankingGrid.IsVisible;
        }
    }
}