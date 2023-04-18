using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Mongo
{

    [BsonIgnoreExtraElements]
    public class DTAmount
    {
        public string total { get; set; }

    }

    [BsonIgnoreExtraElements]
    public class DTTransaction
    {
        public DTAmount amount { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class DTInvoice
    {
        public string state { get; set; }

        public List<DTTransaction> transactions { get; set; }

    }

    [BsonIgnoreExtraElements]
    public class DTPaypalMongo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("userId")]
        public string? userId { get; set; }

        public DTInvoice invoice { get; set; }


    }
}
