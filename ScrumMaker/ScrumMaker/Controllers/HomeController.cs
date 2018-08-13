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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScrumMaker.Attributes;

namespace ScrumMaker.Controllers
{
    public class HomeController : Controller
    {

        private IRepository<User> _users;

        public HomeController(IRepository<User> users)
        {
            _users = users;
        }

        [CookieAuthorize]
        [RefreshToken]
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        [Route("/getUser")]
        [HttpGet]
        public User Myself()
        {
            int id = this.HttpContext.User.UserId();
            User user = _users.GetById(id) ?? new User() { Login = "Anonym", UserId = -1 };
            Response.ContentType = "application/json";

            return user;
        }
    }
}
