using Azure7_Dz_12._05.Models;
using Azure7_Dz_12._05.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Azure7_Dz_12._05.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly LibraryDBContext context;

        public AuthorController(LibraryDBContext context)
        {
            this.context = context;
        }
        // GET: api/<AuthorController>
        [HttpGet]
        public async Task<IEnumerable<Author>> Get()
        {
            return await context.Authors.GetAuthorsAsync();
        }

        // GET api/<AuthorController>/5
        [HttpGet("{id}")]
        public async Task<Author> Get(string id)
        {
            return await context.Authors.GetAuthorByIdAsync(id);
        }

        // POST api/<AuthorController>
        [HttpPost]
        public async void Post([FromBody] Author author )    
        {
            await context.Authors.AddAuthorAsync(author);
        }

        // PUT api/<AuthorController>/5
        [HttpPut]
        public async void Put([FromBody]Author author)
        {
            await context.Authors.UpdateAuthorAsync(author);
        }

        // DELETE api/<AuthorController>/5
        [HttpDelete("{id}")]
        public async void Delete(string id)
        {
            await context.Authors.DeleteAuthorAsync(id);
        }
    }
}
