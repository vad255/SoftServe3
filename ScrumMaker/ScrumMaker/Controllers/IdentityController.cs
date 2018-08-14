using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BL;
using BL.Authentication;
using BL.CryptoServiceProvider;
using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using ScrumMaker;
using ScrumMaker.Attributes;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ScrumMaker.Controllers
{
    public class IdentityController : Controller
    {
        private IRepository<User> _users;
        private IRepository<Role> _roles;

        public IdentityController(IRepository<User> users, IRepository<Role> roles)
        {
            _users = users;
            _roles = roles;
        }

        [UserAuthorize]
        public IActionResult Index()
        {
            UserAnotation.OneRequest = false;
            return View();

        }

        [Route("/token")]
        [HttpPost]
        public async Task Token(LoginViewModel loginViewModel)
        {
            TokenManager tokenManager = new TokenManager(_users);

            ClaimsIdentity identity = tokenManager.GetIdentity(loginViewModel.Login, loginViewModel.Password);
            if (identity == null)
            {
                Logger.Logger.LogError("IdentityController:Token():Invalid username or password.");
                Response.StatusCode = 400;
                await Response.WriteAsync("Invalid username or password.");
                return;
            }

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(tokenManager.CreateToken(identity));

            var response = new
            {
                access_token = encodedJwt,
                expires = AuthOptions.LIFETIME,
                status = StatusCode(200).StatusCode
            };

            Logger.Logger.LogInfo($"IdentityController:Token():User {loginViewModel.Login} signed in.");
            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }

        [Route("/myself")]
        [HttpGet]
        public async Task Myself()
        {
            int id = this.HttpContext.User.UserId();
            User user = _users.GetById(id) ?? new User() { Login = "Anonym", UserId = -1 };
            user.Role = _roles.GetById(user.RoleId);
            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(user));
        }
        [Route("/logout")]
        public IActionResult LogOut()
        {
            HttpContext.Response.Cookies.Delete("Authorization");
            return Redirect("/login");
        }
        [Route("/getrole")]
        [HttpGet]
        public async Task GetRole()
        {
            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(HttpContext.User.UserRole()));
        }
    }
}