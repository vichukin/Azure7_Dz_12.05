using Microsoft.Azure.Cosmos;

namespace Azure7_Dz_12._05.Services
{
    public class LibraryDBContext
    {
        private string database;
        private CosmosClient client;
        public LibraryDBContext(CosmosClient client, string databaseId) 
        {
            this.client = client;
            this.database = databaseId;
            Authors = new AuthorService(this.client, database, "Authors","Books");
            Books = new BookService(this.client,database,"Books","Authors");
        }
        public AuthorService Authors;
        public BookService Books;

    }
}
