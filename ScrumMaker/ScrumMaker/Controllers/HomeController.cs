using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BL;
using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ScrumMaker.Controllers
{
    public class HomeController : Controller
    {

        private IRepository<User> _users;

        public HomeController(IRepository<User> users)
        {
            _users = users;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        [HttpGet]
        [Route("api/Home/GetLogin")]
        public string GetLogin()
        {
            ClaimsIdentity identity = HttpContext.User?.Identity as ClaimsIdentity;
            string idFromClaims = identity.Claims.Where(c => c.Type == ClaimsKeys.ID).FirstOrDefault()?.Value;
            return _users.GetById(int.Parse(idFromClaims)).Login;
        }
    }
}
