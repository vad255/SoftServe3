﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BL.Authentication;
using static BL.ClaimsKeys;


namespace ScrumMaker
{
    public static class Extensions
    {
        public static IApplicationBuilder LoadTokenDataToContext(this IApplicationBuilder builder)
        {
            builder.Use(async (context, next) =>
            {
                var value = context.Request.Cookies["Authorization"];

                if (value == null)
                {
                    SetDefault(context);
                    await next.Invoke();
                    return;
                };

                JwtSecurityToken token = new JwtSecurityTokenHandler().ReadJwtToken(value);

                var exp = token.Claims.FirstOrDefault(claim => claim.Type == "exp")?.Value ?? string.Empty;
                long expires = -1;
                Int64.TryParse(exp, out expires);
                
                if (expires < ((DateTimeOffset)DateTime.Now).ToUnixTimeSeconds())
                {
                    SetDefault(context);
                    await next.Invoke();
                    return;
                };

                Set(context, token.Claims);

                await next.Invoke();
            });

            return builder;
        }

        private static void SetDefault(HttpContext context)
        {

            var claims = new List<Claim>()
                {
                    new Claim(LOGIN, "Anonym"),
                    new Claim(ROLE,""),
                    new Claim(ID,(-1).ToString())
                };

            Set(context, claims);
        }

        private static void Set(HttpContext context, IEnumerable<Claim> claims)
        {
            ClaimsIdentity identity = new ClaimsIdentity(claims, "BaseInfo");
            ClaimsPrincipal principal = new ClaimsPrincipal(identity);
            context.User = principal;
        }


        public static string UserLogin(this ClaimsPrincipal identity)
        {
            ClaimsIdentity claims = identity.Identity as ClaimsIdentity;

            if (claims == null)
                return null;

            string name = identity.Claims.Where(c => c.Type == LOGIN).FirstOrDefault()?.Value;

            return name;
        }
        public static int UserId(this ClaimsPrincipal identity)
        {
            ClaimsIdentity claims = identity.Identity as ClaimsIdentity;

            if (claims == null)
                return -1;

            int authorId = -1;
            string idFromClaims = identity.Claims.Where(c => c.Type == ID).FirstOrDefault()?.Value;
            int.TryParse(idFromClaims, out authorId);

            return authorId;
        }
        public static string UserRole(this ClaimsPrincipal identity)
        {
            ClaimsIdentity claims = identity.Identity as ClaimsIdentity;

            if (claims == null)
                return null;

            string role = identity.Claims.Where(c => c.Type == ROLE).FirstOrDefault()?.Value;

            return role;
        }


    }
}