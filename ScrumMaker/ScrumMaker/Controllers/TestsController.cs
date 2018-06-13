using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using DAL.Access;
using DAL.Models;

namespace ScrumMaker.Controllers
{
    public class TestsController : Controller
    {
        private IRepository<User> _repository;

        public TestsController(IRepository<User> repository)
        {
            _repository = repository;
        }

        public ActionResult ShowUsers()
        {
            List<User> users = _repository.Get().ToList();

            ViewData["users"] = users;

            return View();

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                _repository.Dispose();
            _repository = null;

            base.Dispose(disposing);
        }

    }
}
