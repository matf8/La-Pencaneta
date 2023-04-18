using thePencaneta.Models;
using Newtonsoft.Json;
using Xamarin.Essentials;
using Xamarin.Forms;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text;
using System;
using System.Linq;
using thePencaneta.ViewModels;
using JsonSerializer = Newtonsoft.Json.JsonSerializer;

namespace thePencaneta {

    public partial class HomePage : ContentPage {

        private UsuarioDTO logged; 
        List<HomePageViewModel> vList = new List<HomePageViewModel>();
        Requests r = new Requests();
        private int cantMensajes = 0;
        JsonSerializerOptions serializerOptions;

        public HomePage() {
            InitializeComponent();
            logged = JsonConvert.DeserializeObject<UsuarioDTO>(Preferences.Get("user", "default_value"));
            lb1List.Text = "Mis pencas";
            GetPencasPublicas();
            GetPencasEmp();
            GetMensajes();
            serializerOptions = new JsonSerializerOptions {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };
        }

        public void GetMensajes() {
            // r.getMensajes();
            // CargarMensajes();
            if (cantMensajes > 0)
                mensajes.IconImageSource = "newActivity.png";
            else mensajes.IconImageSource = "mensajes.png";

        }

        public async Task GetPencasPublicas() {
            try {
                var response = await r.GetPencasPublicasUsuarioAPI();

                if (response.IsSuccessStatusCode) {
                    var data = await response.Content.ReadAsStringAsync();                    
                    var pencasJson = JsonConvert.DeserializeObject<List<HomePageViewModel>>(data);
                    
                    vList = pencasJson;
                    lbVacio.Text = "";
                }
                else Debug.WriteLine("Get Failed");
                FormatList();
            }
            catch (Exception e) {
                Debug.WriteLine(e);
            }
            if (vList.Count > 0)
                pencas.ItemsSource = vList;
            else {
                lbVacio.IsVisible = true;
                lbVacio.Text = "No estás inscripto en ninguna penca";
                lbVacio.Margin = new Thickness(0, 150, 0, 0);
            }
        }


        public async Task GetPencasEmp() {           
            try {
                var list = new List<HomePageViewModel>();
                var response = await r.GetPencasEmpresarialesAPI();

                if (response.IsSuccessStatusCode) {
                    var data = await response.Content.ReadAsStringAsync();
                    var pencasJson = JsonConvert.DeserializeObject<List<HomePageViewModel>>(data);

                    list = pencasJson;
                    lbVacio.Text = "";
                } else Debug.WriteLine("Get Failed");
                if (vList.Count > 0) {
                    if (list.Count > 0) {
                        list.ForEach((x) => vList.Add(x));                      
                    }
                }
            }
            catch (Exception e) {
                Debug.WriteLine(e);
            }
            if (vList.Count > 0)
                pencas.ItemsSource = vList;
            else {
                lbVacio.IsVisible = true;
                lbVacio.Text = "No estás inscripto en ninguna penca";
                lbVacio.Margin = new Thickness(0, 150, 0, 0);
            }
        }

        protected override bool OnBackButtonPressed() {
            return true;
        }

        private void FormatList() {
            for (var i = 0; i < vList.Count; i++) {
                if (vList[i].Nombre.Contains("mundial") == true)
                    vList[i].Foto = "qatar22.jpg";
                else if (vList[i].Nombre.Contains("antel") == true)
                    vList[i].Foto = "antel.jpg";
                else vList[i].Foto = "pencaPlaceholder.png";
            }
        }

        private void BuscarEvent(object sender, TextChangedEventArgs e) {
            pencas.ItemsSource = vList.Where(s => s.Nombre.Contains(e.NewTextValue));
                
        }

        public async void VerEvent(object sender, EventArgs e) {
            ImageButton btn = (ImageButton) sender;
            var item = (HomePageViewModel) btn.CommandParameter;

            if (item == null)
                return;            
            await Navigation.PushAsync(new PencaDetail(item.Nombre, item.Id.ToString()));

        }

        public async void MensajesClicked(object sender, EventArgs e) {
            if (cantMensajes > 0)
                await Navigation.PushModalAsync(new Messages());
            else await DisplayAlert("", "No hay mensajes nuevos!", "Ok");
        }
    }
}
