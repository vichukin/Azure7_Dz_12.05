using Azure7_Dz_12._05.Models;
using Microsoft.Azure.Cosmos;

namespace Azure7_Dz_12._05.Services
{
    public class AuthorService
    {
        private readonly Container container;
        private readonly Container subcontainer;
        public AuthorService(CosmosClient client, string databaseId, string containerId, string subcontainerId)
        {
            container = client.GetContainer(databaseId, containerId);
            subcontainer = client.GetContainer(databaseId, subcontainerId);
        }
        public async Task<IEnumerable<Author>> GetAuthorsAsync()
        {
            QueryDefinition queryDefinition = new QueryDefinition("Select * from c");
            FeedIterator<Author> feedIterator = container.GetItemQueryIterator<Author>(queryDefinition);
            List<Author> authors = new List<Author>();
            while (feedIterator.HasMoreResults)
            {
                FeedResponse<Author> resp = await feedIterator.ReadNextAsync();
                foreach (var author in resp)
                {
                    authors.Add(author);
                }
            }
            return authors;
        }
        public async Task<Author> GetAuthorByIdAsync(string Id)
        {
            ItemResponse<Author> resp = await container.ReadItemAsync<Author>(Id,new PartitionKey(Id));
            QueryDefinition queryDefinition = new QueryDefinition($"Select * from c where c.authorId='{Id}'");
            FeedIterator<Book> feedIterator = subcontainer.GetItemQueryIterator<Book>(queryDefinition);
            List<Book> books = new List<Book>();
            while(feedIterator.HasMoreResults)
            {
                FeedResponse<Book> r = await feedIterator.ReadNextAsync();
                foreach (var book in r)
                {
                    books.Add(book);
                }
            }
            Author author = resp.Resource;
            author.Books=books;
            return author;
        }
        public async Task<Author> AddAuthorAsync(Author author)
        {
            author.Id = Guid.NewGuid().ToString();
            ItemResponse<Author> resp = await container.CreateItemAsync<Author>(author, new PartitionKey(author.Id));
            return resp.Resource;
        }
        public async Task<Author> DeleteAuthorAsync(string Id)
        {
            ItemResponse<Author> resp = await container.DeleteItemAsync<Author>(Id, new PartitionKey(Id));
            return resp.Resource;
        }
        public async Task<Author> UpdateAuthorAsync(Author author)
        {
            ItemResponse<Author> resp = await container.UpsertItemAsync<Author>(author, new PartitionKey(author.Id));
            return resp.Resource;
        }
    }
}
