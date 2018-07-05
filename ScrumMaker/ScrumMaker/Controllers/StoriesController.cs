using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL;
using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    public class StoriesController : ODataController
    {
        private IRepository<Story> _stories;
        private IStoriesManager _manager;
        private DataContext _db;

        public StoriesController(DataContext db, IStoriesManager manager, IRepository<Story> stories)
        {
            _db = db;
            _manager = manager;
            _stories = stories;
        }

        [EnableQuery]
        public IActionResult Get()
        {
           return Ok(_stories.GetAll());
        }


    }
}