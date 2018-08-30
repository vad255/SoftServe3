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

        private bool TeamExists(int key)
        {
            return _teams.GetAll().Count(e => e.Id == key) > 0;
        }

        [AcceptVerbs("DELETE")]
        public bool Delete([FromODataUri] int key)
        {

            if (TeamExists(key))
            {
                List<User> users = _users.GetAll().Where(u => key == u.TeamId).ToList();
                foreach(var i in users)
                {
                    i.TeamId = null;
                    _users.Update(i);
                }

                _teams.Delete(key);
                _teams.Save();
                _users.Save();
                return false;
            }
            else
            {
                return true;
            }
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