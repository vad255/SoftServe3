using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BL;
using Microsoft.AspNet.OData;
using ScrumMaker.Attributes;

namespace ScrumMaker.Controllers
{
    public class RolesController : ODataController
    {
        private IRepository<Role> _roles;

        public RolesController(IRepository<Role> roles)
        {
            _roles = roles;
        }


        [EnableQuery]
        public IActionResult GetRoles()
        {
            return Ok(_roles.GetAll());
        }
    }
}
