using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ScrumMaker.Attributes;

namespace ScrumMaker.Controllers
{
    
    [RefreshToken]
    [CookieAuthorize]
    public class SprintReviewController : ODataController
    {
        private IRepository<SprintReview> sprintReviewRepository;

        public SprintReviewController(IRepository<SprintReview> srr)
        {
            sprintReviewRepository = srr;
        }

        [EnableQuery(MaxExpansionDepth = 4)]
        public IActionResult Get()
        {
            return Ok(sprintReviewRepository.GetAll());
        }

        [AcceptVerbs("PATCH", "MERGE")]
        public IActionResult Patch([FromODataUri] int key, Delta<SprintReview> updateSprintReviewRequestModel)
        {
            if(HttpContext.User.UserRole() == "ScrumMaster")
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                SprintReview sprintReview = sprintReviewRepository.GetById(key);
                if (sprintReview == null)
                {
                    return NotFound();
                }
                updateSprintReviewRequestModel.Patch(sprintReview);
                sprintReviewRepository.Save();

                return Updated(sprintReview);
            }
            return BadRequest(ModelState);
        }
    }
}