using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    public class StoryGridController : Controller
    {
        private IStoriesManager _manager;
        private DataContext _db;

        public StoryGridController(DataContext db, IStoriesManager manager)
        {
            _db = db;
            _manager = manager;
        }

        [HttpGet("[action]")]
        public IEnumerable<Story> GetStories()
        {
            List<Story> db = new List<Story>();
            db.Add(new Story()
            {
                AssignedTo = new User(),
                Sprint = new Sprint(),
                Feature = new Feature(),
                Name = "Name",
                Description = "Description",
                Status = StoryStatus.InProgress
            });

            db.Add(new Story()
            {
                AssignedTo = new User(),
                Sprint = new Sprint(),
                Feature = new Feature(),
                Name = "Name",
                Description = "Description",
                Status = StoryStatus.InProgress
            });

            return db;
        }
    }
}