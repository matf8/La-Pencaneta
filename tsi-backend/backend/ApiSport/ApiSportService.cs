using backend.Mongo;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Net.Http.Json;
using backend.Entities;
using MongoDB.Bson;
using System.Collections.Generic;
using MongoDB.Bson.Serialization;

namespace backend.ApiSport
{
    public interface IApiSportService
    {
        //Task<List<DTApiSportResponse>> GetApiCollection();
        Task<List<EventoDeportivo>?> GetListaEdSports();

        Task<EventoDeportivo?> FindEdSport(int id);
        //Task<DTESportMongo?> GetLastRecordMongo();
        Task<string?> UpgradeApiSport();
        Task<EventoDeportivo?> GetProximoEvento();
        Task<EventoDeportivo?> GetEventoRecienFinalizado();
        //Task<List<EventoDeportivo?>> GetListaSinIniciar();

        Task<string?> GetTestTZ();
        Task<string?> GetTestLeagues();
        Task<string?> GetTestStatus();
        Task<DTApiSportResponse?> GetESport(int id);

    }
    
    public class ApiSportService : IApiSportService
    {
        private readonly IHttpClientFactory _http;
        private string _urlConexion1;
        private string _apiKey1;
        private string _urlConexion2;
        private string _apiKey2;

        private readonly IMongoCollection<DTESportMongo> _mongo;

        private List<DTApiSportResponse> ApiCollection;
        private string? LastMongoId;
        private DateTime LastMongoPush;
        private List<EventoDeportivo> apiListaEventoDeportivos;


        public ApiSportService(IOptions<ApiSportSettings> settings , IHttpClientFactory http, IOptions<PencanetaMongoSettings> settingsMongo)
        {
            _urlConexion1 = settings.Value.URLConexion1;
            _apiKey1 = settings.Value.ApikeyConexion1;

            _urlConexion2 = settings.Value.URLConexion2;
            _apiKey2 = settings.Value.ApikeyConexion2;
            _http = http;

            var mongoClient = new MongoClient(settingsMongo.Value.ConnectionString);
            var monoDatabase = mongoClient.GetDatabase(settingsMongo.Value.DatabaseName);
            _mongo = monoDatabase.GetCollection<DTESportMongo>(settingsMongo.Value.ESportCollectionName);


        }

        public async Task<List<DTApiSportResponse>> GetApiCollection()
        {
            if (LastMongoId == null)
            {
                var lastMongo = await GetLastRecordMongo();
                if (lastMongo != null)
                {
                    LastMongoId = lastMongo.Id;
                    LastMongoPush = lastMongo.CreatedTime;
                    var ListaMongo = BsonSerializer.Deserialize<DTListApiSportResponse>( lastMongo.Response);
                    ApiCollection = ListaMongo.ListaApiSportResponses;
                }
                else
                {
                    await UpgradeApiSport();
                }
            } 
            
            return ApiCollection;
        }

        public async Task<string?> UpgradeApiSport()
        {
            var lista = new List<DTApiSportResponse>();
            var response1 = await GetESport(1); //Mundial Fifa
            if (response1 != null)
            {
                lista.Add(response1);
            }
            var response2 = await GetESport(435); //La Liga Española
            if (response2 != null)
            {
                lista.Add(response2);
            }
            var response3 = await GetESport(436); //La Liga Española 2da division
            if (response2 != null)
            {
                lista.Add(response2);
            }

            ApiCollection = lista;
            var salida =await PushToMongo(lista);
            return salida;

        }

        public async Task<string?> PushToMongo(List<DTApiSportResponse> list)
        {
            
            var eSportMongo = new DTESportMongo { Response = new DTListApiSportResponse(){ListaApiSportResponses = list}.ToBsonDocument() };
            try
            {
                await _mongo.InsertOneAsync(eSportMongo);
                LastMongoId = eSportMongo.Id;
                LastMongoPush = eSportMongo.CreatedTime;

                return eSportMongo.Id;
            }
            catch
            {
                return null;
            }
        }

        public async Task<DTApiSportResponse?> GetESport(int id)
        {
            var client = _http.CreateClient();
            client.BaseAddress = new Uri(_urlConexion1);
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Add("x-rapidapi-host", "v3.football.api-sports.io");
            client.DefaultRequestHeaders.Add("x-rapidapi-key", _apiKey1);

            try
            {
                var response = await client.GetFromJsonAsync<DTApiSportResponse>($"fixtures?league={id}&season=2022&timezone=America/Montevideo");
                return response;
            }
            catch 
            {
                return null;
            }
        }


        public async Task<DTESportMongo?> GetLastRecordMongo()
        {
            var filter = Builders<DTESportMongo>.Sort.Descending(x => x.CreatedTime);
            var project = Builders<DTESportMongo>.Projection.Exclude(x=>x.Response);
            var buscar = await _mongo.Find(new BsonDocument()).Sort(filter).FirstOrDefaultAsync();
            return buscar;
        }

        public async Task SetListaEdSports()
        {
            var colleccion = await GetApiCollection();
            var lista = new List<EventoDeportivo>();
            foreach (var liga in colleccion)
            {
                foreach (var response in liga.response)
                {
                    var item = new EventoDeportivo()
                    {
                        TipoJuego = response.fixture.status.Long,
                        LigaId = response.league.id,
                        LigaNombre = response.league.name,
                        IdRemoto1 = response.fixture.id,
                        EquipoA = response.teams.home.name,
                        EquipoALogo = response.teams.home.logo,
                        EquipoB = response.teams.away.name,
                        EquipoBLogo = response.teams.away.logo,
                        ScoreEquipoA = response.goals.home,
                        ScoreEquipoB = response.goals.away,
                        FechaEvento = DateTime.UnixEpoch.AddSeconds((double)response.fixture.timestamp)

                    };
                    lista.Add(item);
                }
            }
            apiListaEventoDeportivos = lista;

        }

        public async Task<List<EventoDeportivo>?> GetListaEdSports()
        {

            await GetApiCollection();

            if (LastMongoPush.AddHours(6) < DateTime.Now)
            {
                await UpgradeApiSport();
                await SetListaEdSports();
            }
            if (apiListaEventoDeportivos == null)
            {
                await SetListaEdSports();

            }

            return apiListaEventoDeportivos;
        }

        public async Task<EventoDeportivo?> FindEdSport(int id)
        {
            var lista = await GetListaEdSports();
            if (lista == null) return null;
            var buscar = lista.FirstOrDefault(x=>x.IdRemoto1 == id);

                return buscar;
            
        }


        public async Task<EventoDeportivo?> GetProximoEvento()
        {
            var lista = await GetListaEdSports();
            var buscar = lista?.OrderBy(o=>o.FechaEvento).FirstOrDefault(x=>DateTime.UtcNow < x.FechaEvento);
            return buscar;
        }

        public async Task<EventoDeportivo?> GetEventoRecienFinalizado()
        {
            var lista = await GetListaEdSports();
            var buscar = lista?.OrderByDescending(o => o.FechaEvento).FirstOrDefault(x => x.FechaEvento < DateTime.UtcNow);
            return buscar;
        }

        ///


        public async Task<string?> GetTestStatus()
        {
            var client = _http.CreateClient();
            client.BaseAddress = new Uri(_urlConexion1);
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Add("x-rapidapi-host", "v3.football.api-sports.io");
            client.DefaultRequestHeaders.Add("x-rapidapi-key", _apiKey1);

            try
            {
                var response = await client.GetStringAsync("status");
                return response;
            }
            catch
            {
                return null;
            }

        }
        public async Task<string?> GetTestLeagues()
        {
            var client = _http.CreateClient();
            client.BaseAddress = new Uri(_urlConexion1);
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Add("x-rapidapi-host", "v3.football.api-sports.io");
            client.DefaultRequestHeaders.Add("x-rapidapi-key", _apiKey1);

            try
            {
                var response = await client.GetStringAsync("leagues?season=2022");
                return response;
            }
            catch
            {
                return null;
            }

        }



        public async Task<string?> GetTestTZ()
        {
            var client = _http.CreateClient();
            client.BaseAddress = new Uri(_urlConexion1);
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Add("x-rapidapi-host", "v3.football.api-sports.io");
            client.DefaultRequestHeaders.Add("x-rapidapi-key", _apiKey1);

            try
            {
                var response = await client.GetStringAsync("timezone");
                return response;
            }
            catch
            {
                return null;
            }
        }

    }
}
