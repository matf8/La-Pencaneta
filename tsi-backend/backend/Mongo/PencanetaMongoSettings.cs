namespace backend.Mongo
{
    public class PencanetaMongoSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string PaypalCollectionName { get; set; } = null!;

        public string ESportCollectionName { get; set; } = null!;
    }
}
