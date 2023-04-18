using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace backend.ApiSport
{
    public class DTESportMongo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public DateTime CreatedTime { get; set; } = System.DateTime.UtcNow;

        public BsonDocument Response { get; set; }

    }
}
