using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;

namespace ScrumMaker.Controllers
{
    public class TeamsController : ODataController
    {
        private IRepository<Team> _teams;

        public TeamsController(IRepository<Team> repository)
        {
            _teams = repository;
        }

        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_teams.GetAll());
        }
    }
}