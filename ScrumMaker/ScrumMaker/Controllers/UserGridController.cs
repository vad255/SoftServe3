using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    public class UserGrid : Controller
    {
        private DataContext _db;
        public UserGrid(DataContext db)
        {
            _db = db;
        }
        [HttpGet("[action]")]
        public List<User> GetUser()
        {
            //using (_db)
            //{
            //    _db.Roles.Add(new Role { Name = "Admin" });
            //    _db.Users.Add(new User { Login = "BLa", Activity = true, Password = "BlaBla", RoleId = 1 });
            //    _db.SaveChanges();
            //}
            return _db.Users.ToList();
        }
        [HttpGet("[action]")]
        public List<Role> GetRoles()
        {
            return _db.Roles.ToList();
        }
    }
}
