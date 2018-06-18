using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using ScrumMaker.Authentication;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ScrumMaker.Controllers
{
    public class IdentiryController : Controller
    {
        private DataContext _db;
        public IdentiryController(DataContext db)
        {
            _db = db;
        }

        [HttpPost("/token")]
        public async Task Token([FromBody] LoginViewModel loginViewModel)
        {
            var login = loginViewModel.Login;
            var password = loginViewModel.Password;

            var identity = GetIdentity(login, password);
            if (identity == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Invalid username or password.");
                return;
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromSeconds(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                expires = AuthOptions.LIFETIME,
                status = StatusCode(200).StatusCode
            };

            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }
        private ClaimsIdentity GetIdentity(string login, string password)
        {
            List<User> users = _db.Users.ToList();
            User user = users.FirstOrDefault(x => x.Login == login && x.Password == password);
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            return null;
        }
    }
}
