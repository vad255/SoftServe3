using BL.Interface;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;

namespace BL
{
    class EditUserManager : IEditUserManager
    {
        public void EditPhoto()
        {
            throw new NotImplementedException();
        }

        public string GetLogin()
        {
            var value = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicXdlIiwibmJmIjoxNTMwNzIwNDA3LCJleHAiOjE1MzA3MjA1MjcsImlzcyI6Ik15QXV0aFNlcnZlciIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDk5NzEvIn0.aHnPKXHcl1Xn-zrosEXGwA--vVxRn4WYS0YiZCzY228";
            //object value = HttpContext.Request.Cookies["Authorization"];
            string login = null;
            if (value != null)
            {
                var handler = new JwtSecurityTokenHandler();
                var token = handler.ReadToken(value) as JwtSecurityToken;
                login = token.Claims.First(claim => claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name").Value;
            }
            return login;
        }

        public User GetUser()
        {
            throw new NotImplementedException();
        }
    }
}
