using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using BL;

namespace ScrumMaker.Controllers
{
    public class TeamsController : ODataController
    {
        private IRepository<Team> _teams;
        private ITeamsManager _manager;

        public TeamsController(IRepository<Team> repository, ITeamsManager teamsManager)
        {
            _teams = repository;
            _manager = teamsManager;
        }

        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_teams.GetAll());
        }


        [HttpGet]
        [Route("api/[controller]/getfreeteams")]
        public IActionResult GetFreeTeams()
        {
            return Ok(_manager.GetUnemployedTeams());
        }
    }
}