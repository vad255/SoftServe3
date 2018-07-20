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
using Microsoft.EntityFrameworkCore;

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

      
        [AcceptVerbs("PATCH", "MERGE")]
        public IActionResult Patch([FromODataUri] int key, [FromBody] Delta<Story> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Story story = _stories.GetById(key);

            if (story == null)
            {
                return NotFound();
            }

            patch.Patch(story);

            try
            {
                 _stories.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoryExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(story);
        }

        private bool StoryExists(int key)
        {
            return _stories.GetAll().Count(e => e.Id == key) > 0;
        }       

    }
}