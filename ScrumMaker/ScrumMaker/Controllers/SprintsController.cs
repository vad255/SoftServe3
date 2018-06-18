﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using DAL.Models;
using DAL.Access;

namespace ScrumMaker.Controllers
{

    public class TestModel
    {
        public int PropA { get; set; }

        public string PropB { get; set; }

    }

    [Route("api/[controller]")]
    public class SprintsController : Controller
    {

        private IRepository<Sprint> _sprints;

        public SprintsController(IRepository<Sprint> repository)
        {
            _sprints = repository;
        }



        [HttpGet("[action]")]
        public IEnumerable<Sprint> Get()
       {
            var sprints = _sprints.GetAll().Include(s => s.History).Include(s => s.Team).Include(s => s.Team.Members);

            List<Sprint> result = sprints.ToList();

            result = sprints.ToList();
        
            return result;
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
     

        protected override void Dispose(bool disposing)
        {
            _sprints.Dispose();
            base.Dispose(disposing);
        }

    }
}
