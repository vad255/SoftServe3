using DAL.Access;
using DAL.Models;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using static BL.ClaimsKeys;


namespace BL.Authentication
{
    public class TokenManager
    {
        private IRepository<User> _users;
        public TokenManager(IRepository<User> users)
        {
            _users = users;
        }
        public ClaimsIdentity GetIdentity(string login, string password)
        {
            User user = _users.GetAll().
                Where(u => u.Login == login && u.Password == password).
                Include(u => u.Role).
                FirstOrDefault();

            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(LOGIN, user.Login),
                    new Claim(ROLE,user.Role.Name),
                    new Claim(ID,user.UserId.ToString())
                };

                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(
                    claims: claims,
                    authenticationType: "Token",
                    nameType: ClaimsIdentity.DefaultNameClaimType,
                    roleType: ClaimsIdentity.DefaultRoleClaimType
                    );

                return claimsIdentity;
            }
            return null;
        }
        public JwtSecurityToken CreateToken(ClaimsIdentity identity)
        {
            var now = DateTime.Now;
            JwtSecurityToken jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromSeconds(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                    SecurityAlgorithms.HmacSha256));
            return jwt;
        }

    }
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer";
        public const string AUDIENCE = "http://localhost:49971/";
        const string KEY = "scrummakerscrummakerscrummaker";
        public const int LIFETIME = 1800;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
