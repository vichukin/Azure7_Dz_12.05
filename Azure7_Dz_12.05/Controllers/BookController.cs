using Azure7_Dz_12._05.Models;
using Azure7_Dz_12._05.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Azure7_Dz_12._05.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly LibraryDBContext context;

        public BookController(LibraryDBContext context) {
            this.context = context;
        }
        // GET: api/<BookController>
        [HttpGet]
        public async Task<IEnumerable<Book>> Get()
        {
            return await context.Books.GetBooks();
        }

        // GET api/<BookController>/5
        [HttpGet("author/{authorId}")]
        public async Task<IEnumerable<Book>> GetByAuthorId(string authorId)
        {
            return await context.Books.GetBooksByAuthorIdAsync(authorId);
        }
        [HttpGet("{id}")]
        public async Task<Book> Get(string id)
        {
            return await context.Books.GetBookByIdAsync(id);
        }

        // POST api/<BookController>
        [HttpPost]
        public async void Post([FromBody] Book book)
        {
            await context.Books.AddBookAsync(book);
        }

        // PUT api/<BookController>/5
        [HttpPut]
        public async void Put([FromBody] Book book)
        {
            await context.Books.UpdateBookAsync(book);
        }

        // DELETE api/<BookController>/5
        [HttpDelete("{id}")]
        public async void Delete(string id)
        {
            await context.Books.DeleteBookAsync(id);
        }
    }
}
