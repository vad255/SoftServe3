using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ScrumMaker.Controllers
{
    public class ErrorController : Controller
    {
        [Route("/getErrorPage")]
        public IActionResult Index()
        {
            throw new Exception();
        }
    }
}