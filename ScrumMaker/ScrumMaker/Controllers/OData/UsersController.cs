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
        public UsersController(IRepository<User> users)
        {
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
        public void SetUser([FromBody]List<User> model)
        {
            int? teamid = model[0].TeamId;
            List<User> temp = _users.GetAll().Where(u => u.TeamId == teamid).ToList();
     
            foreach(var i in temp)
            { 
                foreach(var z in model)
                {
                    if(z.UserId == i.UserId)
                    {
                        i.TeamId = null;
                    }
                    z.TeamId = teamid;
                }
            }

            foreach (var i in temp)
            {
                if (i.TeamId != null)
                {
                    User user = _users.GetById(i.UserId);
                    user.TeamId = null;
                    _users.Update(user);
                    break;
                }
            }

            foreach (var i in model)
            {
                User user = _users.GetById(i.UserId);
                user.TeamId = i.TeamId;
                _users.Update(user);
            }


            _users.Save();
        }
    }
}
