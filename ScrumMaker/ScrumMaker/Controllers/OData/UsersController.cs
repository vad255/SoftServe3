using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BL;
using Microsoft.AspNet.OData;
using ScrumMaker.Attributes;

namespace ScrumMaker.Controllers
{
    public class UsersController : ODataController
    {
        private IRepository<User> _users;
        private IRepository<Team> _teams;
        public UsersController(IRepository<User> users, IRepository<Team> teams)
        {
            _teams = teams;
            _users = users;
        }

        [RefreshToken]
        [CookieAuthorize]
        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_users.GetAll());
        }

        [AcceptVerbs("PATCH", "MERGE")]
        public IActionResult Patch([FromODataUri] int key, Delta<User> updateUserRequestModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            User user = _users.GetAll().Include(x => x.Role).FirstOrDefault(x => x.UserId == key);
            if (user == null)
            {
                return NotFound();
            }
            updateUserRequestModel.Patch(user);
            _users.Save();

            return Updated(user);
        }

        [HttpPost]
        [Route("api/sers/SetUsers")]
        public void SetUser([FromBody]WorkWithTeam model)
        {

            int teamId = _teams.GetAll().Where(t => t.Id == model.Users.FirstOrDefault().TeamId).FirstOrDefault().Id;

            List<User> users = _users.GetAll().Where(u => u.TeamId == teamId).ToList();


            foreach(var i in users)
            {
                User user = _users.GetById(i.UserId);
                user.TeamId = null;
                _users.Update(user);
            }

            foreach(var i in model.Users)
            {
                User user = _users.GetById(i.UserId);
                user.TeamId = teamId;
                _users.Update(user);
            }

            _users.Save();
        }
    }
}
