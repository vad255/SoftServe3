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

        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_users.GetAll());
        }

        [CookieAuthorize]
        [Route("/api/usergrid")]
        public void GetGrid()
        {
            Response.Redirect("/usergrid");
        }

    }
}
