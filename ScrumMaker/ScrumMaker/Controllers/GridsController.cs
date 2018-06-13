using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using DAL.Models;
using DAL.Access;

namespace ScrumMaker.Controllers
{

    [Route("api/[controller]")]
    public class GridsController : Controller
    {

        private DbContext _context;

        public GridsController(DbContext context)
        {

            _context = context;
        }



        [HttpGet("[action]")]
        public IEnumerable<Sprint> Sprints()
        {
            var sprints = _context.Set<Sprint>().Include(s => s.History).Include(s => s.Team);

            //Console.WriteLine(sprints.GetById(3).History.Initiated);

            List<Sprint> result = sprints.ToList();

            return result;
        }



        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
            base.Dispose(disposing);
        }

    }
}
