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
            //var sprints = _sprints.GetAll().Include(s => s.History).Include(s => s.Team).Include(s => s.Team.Members);

            //List<Sprint> result = sprints.ToList();

            //result = sprints.ToList();
        
            return Ok(_sprints.GetAll());
        }

    }
}
