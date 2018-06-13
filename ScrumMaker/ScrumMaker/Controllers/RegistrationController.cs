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


namespace ReactCrudDemo.Controllers
{
    public class RegistartionController : Controller
    {

        [HttpPost]
        [Route("api/User/Create")]
        public void Create(User user)
        {

            //Need to create new User because i have not database
            Console.WriteLine(user.Login);
            Console.WriteLine(user.Password);
            Console.WriteLine(user.RoleId);

        }
    }
}
