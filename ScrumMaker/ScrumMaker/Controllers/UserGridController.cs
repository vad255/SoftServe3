using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    public class UserGridController : Controller
    {
        private IRepository<User> _users;
        private IRepository<Role> _roles;
        public UserGridController(IRepository<User> users, IRepository<Role> roles)
        {
            _users = users;
            _roles = roles;
        }
        [HttpGet("[action]")]
        public IEnumerable<User> GetUser()
        {
            return _users.GetList();
        }
        [HttpGet("[action]")]
        public IEnumerable<Role> GetRoles()
        {
            return _roles.GetList();
        }
    }
}
