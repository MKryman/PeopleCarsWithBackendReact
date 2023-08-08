using Homework_05_15.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Homework_05_15.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("ConStr");
        }

        [Route("getallpeople")]
        public List<Person> GetAllPeople()
        {
            var repo = new PersonCarRepository(_connectionString);
            return repo.GetPeople();
        }
        
        [Route("getpersonbyid")]
        public Person GetById(int id)
        {
            var repo = new PersonCarRepository(_connectionString);
            return repo.GetPersonById(id);
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person p)
        {
            var repo = new PersonCarRepository(_connectionString);
            repo.AddPerson(p);
        }

        [HttpPost]
        [Route("addcar")]
        public void AddCar(Car c)
        {
            var repo = new PersonCarRepository(_connectionString);
            repo.AddCar(c);
        }

        [Route("viewcarsforperson")]
        public List<Car> GetCarsForPerson(int id)
        {
            var repo = new PersonCarRepository(_connectionString);
            return repo.GetPersonById(id).ThisPersonsCars;
        }

        [HttpPost]
        [Route("deletecars")]
        public void DeleteCars(int id)
        {
            var repo = new PersonCarRepository(_connectionString);
            repo.DeleteCars(id);
        }
    }
}
