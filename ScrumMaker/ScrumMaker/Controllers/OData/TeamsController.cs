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
using ScrumMaker.Attributes;

namespace ScrumMaker.Controllers
{
    public class TeamsController : ODataController
    {
        private IRepository<Team> _teams;
        private IRepository<User> _users;
        private ITeamsManager _manager;

        public TeamsController(IRepository<Team> repository, IRepository<User> users, ITeamsManager teamsManager)
        {
            _teams = repository;
            _users = users;
            _manager = teamsManager;
        }

        [RefreshToken]
        [CookieAuthorize]
        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_teams.GetAll());
        }

        [EnableQuery]
        public IActionResult GetById(int id)
        {
            return Ok(_teams.GetById(id));
        }

        [AcceptVerbs("PATCH", "MERGE")]
        public IActionResult Patch([FromODataUri] int key, Delta<Team> updateTeamRequestModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Team team = _teams.GetById(key);
            if (team == null)
            {
                return NotFound();
            }
            updateTeamRequestModel.Patch(team);
            _teams.Save();

            return Updated(team);
        }

        [AcceptVerbs("DELETE")]
        public IActionResult Delete([FromODataUri] int key)
        {
            _teams.Delete(key);
            _teams.Save();
            return NoContent();
        }

        [AcceptVerbs("POST")]
        public IActionResult Post([FromBody]WorkWithTeam team)
        {
            if (team.TeamName.Length > 0)
            {
                _teams.Create(new Team() { Name = team.TeamName });
                _teams.Save();
                Team newTeam = _teams.GetAll().Where(t => t.Name.Equals(team.TeamName)).First();
                foreach (var i in team.Users)
                {
                    User users = _users.GetAll().Where(u => u.UserId == i.UserId).First();
                    users.TeamId = newTeam.Id;
                    _users.Update(users);
                }
                _users.Save();
            }

            return Created(team);
        }

        [HttpGet]
        [Route("api/[controller]/getfreeteams")]
        public IActionResult GetFreeTeams()
        {
            return Ok(_manager.GetUnemployedTeams());
        }
    }
}