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
using BL.Interface;

namespace ScrumMaker.Controllers
{
    [RefreshToken]
    [CookieAuthorize]
    public class SprintReviewController : ODataController
    {
        private ISprintReviewManager sprintReviewManager;

        public SprintReviewController(ISprintReviewManager sprintReviewManager)
        {
            this.sprintReviewManager = sprintReviewManager;
        }

        [EnableQuery(MaxExpansionDepth = 4)]
        public IActionResult Get()
        {
            return Ok(sprintReviewManager.Get());
        }

        [AcceptVerbs("PATCH", "MERGE")]
        public IActionResult Patch([FromODataUri] int key, Delta<SprintReview> updateSprintReviewRequestModel)
        {
            if (HttpContext.User.UserRole() == "ScrumMaster")
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                SprintReview sprintReview = sprintReviewManager.GetById(key);
                if (sprintReview == null)
                {
                    return NotFound();
                }

                updateSprintReviewRequestModel.Patch(sprintReview);
                sprintReviewManager.Update(sprintReview);

                return Updated(sprintReview);
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        [AcceptVerbs("POST")]
        public IActionResult CreateReview([FromBody] SprintReview sprintReview)
        {
            try
            {
                sprintReviewManager.Create(sprintReview);
                return Ok(sprintReview);
            }
            catch (Exception e)
            {
                Logger.Logger.LogError("Creating failed.", e);
                return BadRequest();
            }
        }
    }
}