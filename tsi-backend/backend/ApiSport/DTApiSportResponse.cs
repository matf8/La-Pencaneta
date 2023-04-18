using System.Text.Json.Serialization;

namespace backend.ApiSport
{
    public class DTGoals
    {
        public int? home { get; set; }
        public int? away { get; set; }
    }
    public class DTTeam
    {
        public int? id { get; set; }
        public string? name { get; set; }
        public string? logo { get; set; }
    }

    public class DTTeams
    {
        public DTTeam? home { get; set; }
        public DTTeam? away { get; set; }

    }
    public class DTLeague
    {
        public int? id { get; set; }
        public string? name { get; set; }
        public string? country { get; set; }
        public string? logo { get; set; }
    }

    public class DTStatus
    {
        [JsonPropertyName("long")]
        public string? Long { get; set; }
        [JsonPropertyName("short")]
        public string? Short { get; set; }
        [JsonPropertyName("elapsed")]
        public int? Elapsed { get; set; }
    }

    public class DTFixture
    {
        public int? id { get; set; }
        public int? timestamp { get; set; }
        public DTStatus? status { get; set; }


    }

    public class DTResponse
    {
        public DTLeague? league { get; set; }
        public DTFixture? fixture { get; set; }
        public DTTeams? teams { get; set; }
        public DTGoals? goals { get; set; }
    }
    public class DTApiSportResponse
    {
        public string? get { get; set; }
        public int? results { get; set; }
        public List<DTResponse>? response { get; set; }
    }

    public class DTListApiSportResponse
    {
        public List<DTApiSportResponse> ListaApiSportResponses { get; set; }
    }
}
