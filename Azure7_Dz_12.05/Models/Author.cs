using Newtonsoft.Json;

namespace Azure7_Dz_12._05.Models
{
    public class Author
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("yearofbirth")]
        public int YearOfBirth { get; set; }
        [JsonIgnore]
        public List<Book>? Books { get; set; }
        
    }
}
