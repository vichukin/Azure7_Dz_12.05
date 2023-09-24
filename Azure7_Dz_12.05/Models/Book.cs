using Newtonsoft.Json;

namespace Azure7_Dz_12._05.Models
{
    public class Book
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("authorId")]
        public string AuthorId { get; set; }
        [JsonIgnore]
        public Author? Author { get; set; }
    }
}
