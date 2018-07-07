using BL.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ScrumMaker.Attributes
{
    public class RefreshTokenAttribute : Attribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            var value = context.HttpContext.Request.Cookies["Authorization"];
            var handler = new JwtSecurityTokenHandler();
            var token  = handler.ReadToken(value) as JwtSecurityToken;
            token.Payload["exp"] = ((DateTimeOffset)DateTime.Now.Add(TimeSpan.FromSeconds(AuthOptions.LIFETIME))).ToUnixTimeSeconds();
            CookieOptions options = new CookieOptions();
            options.Expires = DateTime.Now.AddSeconds(AuthOptions.LIFETIME);
            context.HttpContext.Response.Cookies.Append("Authorization", handler.WriteToken(token), options);
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
        }
    }
}
