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
    }
}
