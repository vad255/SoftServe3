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
            //updateTeamRequestModel.Patch(team);
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
    }
}