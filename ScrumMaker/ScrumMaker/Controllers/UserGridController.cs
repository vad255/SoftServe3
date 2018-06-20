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

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    public class UserGridController : Controller
    {
        private IUserManager _manager;
        private IRepository<User> _users;
        private IRepository<Role> _roles;
        public UserGridController(IRepository<User> users, IRepository<Role> roles, IUserManager manager)
        {
            _manager = manager;
            _users = users;
            _roles = roles;
        }
        [HttpGet("[action]")]
        public IEnumerable<User> GetUser()
        {
            return _users.GetAll();
        }
        [HttpGet("[action]")]
        public IEnumerable<Role> GetRoles()
        {
            return _roles.GetAll();
        }
    }
}
