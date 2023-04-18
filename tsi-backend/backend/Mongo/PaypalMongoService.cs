using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace backend.Mongo
{
    public class PaypalMongoService
    {
        private readonly IMongoCollection<DTPaypalMongo> _mongo;

        public PaypalMongoService(IOptions<PencanetaMongoSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.ConnectionString);
            var monoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _mongo =monoDatabase.GetCollection<DTPaypalMongo>(settings.Value.PaypalCollectionName);
        }

        public async Task<List<DTPaypalMongo>> GetAsync()
        {
            var salida = await _mongo.Find(_ => true).ToListAsync();
            return salida;
        }


        public async Task<DTPaypalMongo?> GetAsync(string id)
        {
            var salida = await _mongo.Find(x => x.Id == id).FirstOrDefaultAsync();
            return salida;
        }

        public async Task<List<DTPaypalMongo>?> GetbyEmailAsync(string email)
        {
            var salida = await _mongo.Find(x => x.userId == email).ToListAsync();
            return salida;
        }
    }
}
