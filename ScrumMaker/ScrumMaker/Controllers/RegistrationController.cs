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
using System.Reflection.Metadata;
using DAL;
using ScrumMaker.Logger;
using BL.CryptoServiceProvider;

namespace ReactCrudDemo.Controllers
{
    public class RegistartionController : Controller
    {
        private DataContext _db;
        public RegistartionController(DataContext db)
        {
            _db = db;
        }

        [HttpPost]
        [Route("api/User/Create")]
        public bool Create(User user)
        {
            try
            {
                var hash = PasswordStorage.CreateHash(user.Password);
                user.Password = hash;
                _db.Users.Add(user);
                _db.SaveChanges();
                Logger.LogInfo("RegistartionController:Create():Registration was successful!");
                return true;
            }

            catch (Exception e)
            {
                Logger.LogError("RegistartionController:Create():Registration was not successful. Something went wrong!", e);
                return false;
            }
        }
    }
}
