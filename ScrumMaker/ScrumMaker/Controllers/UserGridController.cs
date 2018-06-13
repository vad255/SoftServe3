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
        [HttpGet("[action]")]
        public List<User> GetUser()
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseSqlServer("Server = DESKTOP-OVQI0E0; Database = ScrumMaker; Trusted_Connection = True; MultipleActiveResultSets = true");
            DataContext db = new DataContext(optionsBuilder.Options);
            //db.Users.Add(new User { Login = "BLa", Activity = true, Password = "BlaBla", RoleId = 1 });
            //db.SaveChanges();
            return db.Users.ToList();
        }
    }
}
