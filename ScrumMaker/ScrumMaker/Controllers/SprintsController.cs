using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.OData;

using DAL.Models;
using DAL.Access;

namespace ScrumMaker.Controllers
{

    public class SprintsController : ODataController
    {
        private IRepository<Sprint> _sprints;

        public SprintsController(IRepository<Sprint> repository)
        {
            _sprints = repository;
        }

        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_sprints.GetAll());
        }


        [HttpPost("[action]")]
        public IActionResult Create([FromBody] Sprint sprint)
        {
            Console.WriteLine(sprint.Id);
            return NoContent();
        }



        [HttpPut("[action]")]
        public IActionResult Update([FromBody] Sprint sprint)
        {
            Console.WriteLine(sprint.Id);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromForm] int id)
        {
            Console.WriteLine(id);
            return NoContent();
        }
           
    }
}
