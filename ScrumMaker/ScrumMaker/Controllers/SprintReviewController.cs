using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SprintReviewController : ODataController
    {
        private IRepository<Sprint> sprintRepository;

        public SprintReviewController(IRepository<Sprint> sr)
        {
            sprintRepository = sr;
        }

        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(sprintRepository.GetAll());
        }
    }
}