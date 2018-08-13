using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using BL;

namespace ScrumMaker.Attributes
{
    public class UserAuthorize : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var value = context.HttpContext.Request.Cookies["Authorization"];
            List<Object> objects = context.RouteData.Values.Values.ToList();
            if (value != null && UserAnotation.OneRequest == false && objects[0].Equals("login"))
            {
                UserAnotation.OneRequest = false;
             context.Result = new RedirectResult("~/");
            }
            if(value == null && UserAnotation.OneRequest == false && objects[0].Equals("login"))
            {
                UserAnotation.OneRequest = true;
                context.Result = new RedirectResult("~/login");
            }
        }
    }
}
