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
    public class DailyStandUpController : ODataController
    {
        private IDailyStandUpManager dailyStandUpManager;

        public DailyStandUpController(IDailyStandUpManager dailyStandUpManager)
        {
            this.dailyStandUpManager = dailyStandUpManager;
        }

        [EnableQuery(MaxExpansionDepth = 4)]
        public IActionResult Get()
        {
            return Ok(dailyStandUpManager.Get());
        }

        [AcceptVerbs("PATCH", "MERGE")]
        public IActionResult Patch([FromODataUri] int key, Delta<DailyStandUp> updateDailyStandUpRequestModel)
        {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                DailyStandUp dailyStandUp = dailyStandUpManager.GetById(key);
                if (dailyStandUp == null)
                {
                    return NotFound();
                }

                updateDailyStandUpRequestModel.Patch(dailyStandUp);
                dailyStandUpManager.Update(dailyStandUp);

                return Updated(dailyStandUp);
            
        }

        [HttpPost]
        [AcceptVerbs("POST")]
        public IActionResult CreateReview([FromBody] DailyStandUp dailyStandUp)
        {
            try
            {
                dailyStandUpManager.Create(dailyStandUp);
                return Ok(dailyStandUp);
            }
            catch (Exception e)
            {
                Logger.Logger.LogError("Creating failed.", e);
                return BadRequest();
            }
        }
    }
}