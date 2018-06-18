using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        [Authorize]
        [Route("notall")]
        public IActionResult ForNotAll()
        {
            return Ok("BLA");
        }
        [Route("all")]
        public IActionResult ForAll()
        {
            return Ok("ALB");
        }
    }
}
