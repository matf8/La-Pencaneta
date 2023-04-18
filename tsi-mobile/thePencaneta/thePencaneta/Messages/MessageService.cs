using System;
using System.Threading.Tasks;
using Xamarin.Essentials;
using thePencaneta.Models;
using Newtonsoft.Json;
using System.Diagnostics;
using Microsoft.AspNetCore.SignalR.Client;

namespace thePencaneta {

    public class MessageService {

        private readonly HubConnection hubConnection;

        public MessageService() {
            hubConnection = new HubConnectionBuilder().WithUrl("https://backendpractico.azurewebsites.net/chatHub").Build();
        }

        public async Task Connect() {
            
                //    UsuarioDTO logged = JsonConvert.DeserializeObject<UsuarioDTO>(Preferences.Get("user", "default_value"));
                //    Debug.WriteLine(logged.Email);
                hubConnection.On<string, string>("ReceiveMessage", (user, message) =>
                {
                    Debug.WriteLine("LLega notificacion de : " + user + "\nMensaje: " + message);
                });
            try {
                Debug.WriteLine("########################\nhola");
                await hubConnection.StartAsync();
                Debug.WriteLine("########################\nchau");
            } catch (Exception e) {        
                Debug.WriteLine(e);
            }
        }

        public void ReceiveMessage(string user, string message) {
           


            
        }
    }
}