﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BL.Authentication;
using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ScrumMaker.Controllers
{
    public class IdentityController : Controller
    {
        private IRepository<User> _users;

        public IdentityController(IRepository<User> users)
        {
            _users = users;
        }

        [Route("/token")]
        [HttpPost]
        public async Task Token([FromBody] LoginViewModel loginViewModel)
        {
            TokenManager tokenManager = new TokenManager(_users);
            ClaimsIdentity identity = tokenManager.GetIdentity(loginViewModel.Login, loginViewModel.Password);
            if (identity == null)
            {
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

            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }
    }
}