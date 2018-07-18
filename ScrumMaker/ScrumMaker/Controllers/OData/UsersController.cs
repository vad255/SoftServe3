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

    }
}
