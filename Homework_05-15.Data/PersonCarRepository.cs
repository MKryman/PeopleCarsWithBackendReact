using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_05_15.Data
{
    public class PersonCarRepository
    {
        public readonly string _connectionString;

        public PersonCarRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetPeople()
        {
            var context = new PeopleCarsDataContext(_connectionString);
            return context.People.Include(p => p.ThisPersonsCars).ToList();
        }

        public Person GetPersonById(int id)
        {
            var context = new PeopleCarsDataContext(_connectionString);
            return context.People.Include(p => p.ThisPersonsCars)
                .FirstOrDefault(p => p.Id == id);              
        }

        public void AddPerson(Person p)
        {
            var context = new PeopleCarsDataContext(_connectionString);
            context.People.Add(p);
            context.SaveChanges();
        }

        public void AddCar(Car c)
        {
            var context = new PeopleCarsDataContext(_connectionString);
            context.Cars.Add(c);
            context.SaveChanges();
            
        }

        public void DeleteCars(int personId)
        {
            var context = new PeopleCarsDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Cars WHERE PersonId = {personId}");
            context.SaveChanges();
        }
    }
}
