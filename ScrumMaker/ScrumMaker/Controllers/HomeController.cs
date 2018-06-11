using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
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
            //List<DAL.Models.User> list = null;
            //list = _repository.Get().ToList();
            //ViewData["users"] = list;
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
