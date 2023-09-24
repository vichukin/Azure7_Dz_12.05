using Azure7_Dz_12._05.Models;
using Microsoft.Azure.Cosmos;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Azure7_Dz_12._05.Services
{
    public class BookService
    {
        private readonly Container container;
        private readonly Container subcontainer;
        public BookService(CosmosClient client, string databaseId, string containerId,string subcontainerId) 
        {
            container = client.GetContainer(databaseId, containerId);
            subcontainer = client.GetContainer(databaseId, subcontainerId);
        }
        public async Task<IEnumerable<Book>> GetBooks()
        {
            QueryDefinition queryDefinition = new QueryDefinition("Select * from c");
            FeedIterator<Book> feedIterator = container.GetItemQueryIterator<Book>(queryDefinition);
            List<Book> books = new List<Book>();
            while(feedIterator.HasMoreResults)
            {
                FeedResponse<Book> resp = await feedIterator.ReadNextAsync();
                foreach(var book in resp)
                {
                    ItemResponse<Author> r = await subcontainer.ReadItemAsync<Author>(book.AuthorId, new PartitionKey(book.AuthorId));
                    book.Author = r.Resource;
                    books.Add(book);
                }
            }
            return books;
        }
        public async Task<Book> GetBookByIdAsync(string Id)
        {
            ItemResponse<Book> resp = await container.ReadItemAsync<Book>(Id, new PartitionKey(Id));
            Book book = resp.Resource;
            ItemResponse<Author> r = await subcontainer.ReadItemAsync<Author>(book.AuthorId, new PartitionKey(book.AuthorId));
            book.Author = r.Resource;
            return book;
        }
        public async Task<IEnumerable<Book>> GetBooksByAuthorIdAsync(string Id)
        {
            QueryDefinition queryDefinition = new QueryDefinition($"Select * from c where c.authorId = '{Id}'");
            FeedIterator<Book> feedIterator = container.GetItemQueryIterator<Book>(queryDefinition);
            ItemResponse<Author> r = await subcontainer.ReadItemAsync<Author>(Id, new PartitionKey(Id));
            List<Book> books = new List<Book>();
            while (feedIterator.HasMoreResults)
            {
                FeedResponse<Book> resp = await feedIterator.ReadNextAsync();
                foreach (var book in resp)
                {
                    
                    book.Author = r.Resource;
                    books.Add(book);
                }
            }
            return books; ;
        }
        public async Task<Book> AddBookAsync(Book book)
        {
            book.Id = Guid.NewGuid().ToString();
            ItemResponse<Book> resp = await container.CreateItemAsync<Book>(book, new PartitionKey(book.Id));
            return resp.Resource;
        }
        public async Task<Book> DeleteBookAsync(string Id)
        {
            ItemResponse<Book> resp = await container.DeleteItemAsync<Book>(Id, new PartitionKey(Id));
            return resp.Resource;
        }
        public async Task<Book> UpdateBookAsync(Book book)
        {
            ItemResponse<Book> resp = await container.UpsertItemAsync<Book>(book, new PartitionKey(book.Id));
            return resp.Resource;
        }
    }
}
