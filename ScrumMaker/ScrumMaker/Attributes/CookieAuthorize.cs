using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ScrumMaker.Attributes
{
    public class CookieAuthorize :Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var value = context.HttpContext.Request.Cookies["Authorization"];
            if (value != null)
            {
                var handler = new JwtSecurityTokenHandler();
                var token = handler.ReadToken(value) as JwtSecurityToken;
                var exp = token.Claims.First(claim => claim.Type == "exp").Value;
                if (Int64.Parse(exp) < ((DateTimeOffset)DateTime.Now).ToUnixTimeSeconds())
                {
                    context.Result = new RedirectResult("/login");
                }
            }
            else
            {
                context.Result = new RedirectResult("/login");
            }
        }
    }
}
