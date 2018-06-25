using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    public class TeamGrid : Controller
    {
        private DataContext _db;
        public TeamGrid(DataContext db)
        {
            _db = db;
        }

        [HttpGet("[action]")]
        public List<Team> GetTeam()
        {
            return _db.Teams.ToList();
        }

        [HttpGet("[action]")]
        public List<User> GetUser()
        {
            return _db.Users.ToList();
        }
    }
}