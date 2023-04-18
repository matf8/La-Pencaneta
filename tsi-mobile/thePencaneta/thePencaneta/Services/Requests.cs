using thePencaneta.Models;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text;
using System.Diagnostics;
using System.Net.Http.Headers;
using Xamarin.Essentials;
using thePencaneta.Models.Dto;

namespace thePencaneta { 
    
    public class Requests {

        HttpClient cl;
        JsonSerializerOptions serializerOptions;
        private readonly string endpoint = "https://backendpractico.azurewebsites.net/api/";

        public Requests() {
            cl = new HttpClient();
            serializerOptions = new JsonSerializerOptions {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };
        }

        public async Task<UsuarioDTO> LoginAPI(string u, string p) {
            try { 
                Uri uri = new Uri(endpoint + "Home/login");
                UsuarioLogin item = new UsuarioLogin {
                    email = u,
                    password = p                
                };
                string json = JsonSerializer.Serialize<UsuarioLogin>(item, serializerOptions);
                StringContent content = new StringContent(json, Encoding.UTF8, "application/json");
                Debug.WriteLine(uri, content.ToString());            
                var response = await cl.PostAsync(uri, content);
                if (response.IsSuccessStatusCode) {
                    Debug.WriteLine(@"\tLogged succesfully.");
                    var data = await response.Content.ReadAsStringAsync();
                    UsuarioDTO user = Newtonsoft.Json.JsonConvert.DeserializeObject<UsuarioDTO>(data);                   
                    Preferences.Set("token", user.Token);
                    Debug.WriteLine(user.Nombre + " " + user.Token);
                    return user;
                } else Debug.WriteLine(@"\tLogged failed.");
            } catch (Exception e) {                
                Debug.WriteLine(@"\tLogged failed." + e.ToString());
            }            
            return null;
        }
              
        public async Task<HttpResponseMessage> GetPencasPublicasUsuarioAPI() {
            try {
                cl.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                cl.DefaultRequestHeaders.Add("APP_VERSION", "1.0.0");
                string Token = Preferences.Get("token", "");
                cl.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                Uri uri = new Uri(endpoint + "Usuarios/get-pencas");
                return await cl.GetAsync(uri);
            }
            catch (Exception e) {
                Debug.WriteLine("Get failed: " + e);
            }
            return null;
        }

        public async Task<HttpResponseMessage> GetPencasEmpresarialesAPI() {
            try {
                cl.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                cl.DefaultRequestHeaders.Add("APP_VERSION", "1.0.0");
                string Token = Preferences.Get("token", "");
                cl.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                Uri uri = new Uri(endpoint + "Usuarios/get-empresariales");
                return await cl.GetAsync(uri);
            }
            catch (Exception e) {
                Debug.WriteLine("Get failed: " + e);
            }
            return null;
        }

        public async Task<bool> RegistroAPI(Usuario u) {
           try {
               Uri uri = new Uri(endpoint + "Home/registro");
               var user = new {
                   nombre = u.Nombre,
                   apellido = u.Apellido,
                   emai = u.Email,
                   password = u.Password,
                   telefono = u.Telefono,
                   fnac = u.Fnac
               };
               string json = JsonSerializer.Serialize<Object>(user, serializerOptions);
               StringContent content = new StringContent(json, Encoding.UTF8, "application/json");
               var response = await cl.PostAsync(uri, content);
               Debug.WriteLine(response);
               if (response.IsSuccessStatusCode) {                 
                   Debug.WriteLine(@"Registrado! Bienvenido.");
                   return true;
               } else { 
                   Debug.WriteLine(@"\Registro con problemas. Vuelva a intentar más tarde");
                   return false;
               }                    
           } catch (Exception e) {
               Debug.WriteLine(@"\tLogged failed." + e);
           }      
           return false;
        }

        public async Task<HttpResponseMessage> predictEventAsync(PrediccionDTO p) {
            Debug.WriteLine("####");
            Debug.WriteLine(p.ScoreEquipo1 + p.PencaId);
            Debug.WriteLine("####");
            if (!p.Equals(null)) {
                var predict = new {
                    scoreEquipoA = p.ScoreEquipo1,
                    scoreEquipoB = p.ScoreEquipo2,
                    eventoDeportivoId = p.EventosDeportivoId,
                    pencaId = p.PencaId,                  
                };

                cl.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                string Token = Preferences.Get("token", "");
                cl.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);

                string json = JsonSerializer.Serialize<Object>(predict, serializerOptions);
                StringContent content = new StringContent(json, Encoding.UTF8, "application/json");               
                Uri uri = new Uri(endpoint + "Predicciones");
                return await cl.PostAsync(uri, content);
            } else return null;
        }
        
        public async Task<HttpResponseMessage> GetEventosDeportivos(int pencaId) { 
           try {
               cl.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
               string Token = Preferences.Get("token", "");
               cl.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);              
                Uri uri = new Uri(endpoint + "Usuarios/get-eventos-penca/" + pencaId);
               return await cl.GetAsync(uri);
            } catch (Exception e) {
                 Debug.WriteLine("Get failed: " + e);
            }
            return null;
        }

        public async Task<HttpResponseMessage> GetRanking(int pencaId) {
            try {
                cl.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                string Token = Preferences.Get("token", "");
                cl.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                Uri uri = new Uri(endpoint + "Pencas/usuarios-en-penca/" + pencaId);
                return await cl.GetAsync(uri);
            }
            catch (Exception e) {
                Debug.WriteLine("Get failed: " + e);
            }
            return null;
        }

        public async Task<HttpResponseMessage> GetHistoryPredicctions() {
            try {
                cl.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                string Token = Preferences.Get("token", "");
                cl.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                Uri uri = new Uri(endpoint + "Predicciones/get-by-user");
                return await cl.GetAsync(uri);
            }
            catch (Exception e) {
                Debug.WriteLine("Get failed: " + e);
            }
            return null;
        }
       
        public async Task<HttpResponseMessage> GetEvento(int id) {
            try {
                cl.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                Uri uri = new Uri(endpoint + "EventoDeportivos/" + id);
                return await cl.GetAsync(uri);
            }
            catch (Exception e) {
                Debug.WriteLine("Get failed: " + e);
            }
            return null;
        }

        public async Task<HttpResponseMessage> GetPenca(int id, bool empresarial) {
            try {
                if (empresarial) { 
                    cl.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    Uri uri = new Uri(endpoint + "Empresariales/" + id);
                    return await cl.GetAsync(uri);
                } else {
                    cl.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    Uri uri = new Uri(endpoint + "PozoCompratido/" + id);
                    return await cl.GetAsync(uri);
                }
            }
            catch (Exception e) {
                Debug.WriteLine("Get failed: " + e);
            }
            return null;
        }
    }

}