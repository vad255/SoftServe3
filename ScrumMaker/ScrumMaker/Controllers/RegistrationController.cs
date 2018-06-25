using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using DAL.Models;
using System.Reflection.Metadata;
using DAL;

namespace ReactCrudDemo.Controllers
{
    public class RegistartionController : Controller
    {
        private DataContext _db;
        public RegistartionController(DataContext db)
        {
            _db = db;
        }

        [HttpPost]
        [Route("api/User/Create")]
        public RedirectResult Create(User user)
        {
            _db.Users.Add(user);
            _db.SaveChanges();
            return Redirect("");
        }
    }
}
