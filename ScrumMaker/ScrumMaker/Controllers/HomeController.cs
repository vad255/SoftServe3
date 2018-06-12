using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ScrumMaker.Controllers
{
    public class HomeController : Controller
    {
        private DAL.Access.IRepository<DAL.Models.User> _repository;

        public HomeController(DAL.Access.IRepository<DAL.Models.User> repository)
        {
            _repository = repository;
        }
        public IActionResult Index()
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            var options = optionsBuilder.UseSqlServer(@"Server=DESKTOP-OVQI0E0;Database=Scrum;Trusted_Connection=True;MultipleActiveResultSets=true").Options;
            DataContext db = new DataContext(options);
            db.Users.Add(new DAL.Models.User { Login = "Bla", Password = "BlaBla", TeamId =1, Role = 1, Activity=false});
            db.SaveChanges();

            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            _repository?.Dispose();
            base.Dispose(disposing);
        }
    }
}
