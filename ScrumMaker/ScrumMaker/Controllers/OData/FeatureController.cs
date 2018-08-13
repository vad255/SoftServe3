using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL;
using DAL.Models;
using DAL.Access;
using Microsoft.Extensions.DependencyInjection;
using BL;
using Microsoft.AspNet.OData;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using ScrumMaker.Attributes;

namespace ScrumMaker.Controllers
{
    public class FeatureController : ODataController 
    {
        private readonly IFeaturesManager _featuresManager;

        public FeatureController(IFeaturesManager featuresManager)
        {
            _featuresManager = featuresManager;
        }

        [RefreshToken]
        [CookieAuthorize]
        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_featuresManager.GetAll());
        }

        [EnableQuery]
        public IActionResult GetById(int id)
        {
            return Ok(_featuresManager.Get(id));
        }

        [AcceptVerbs("PATCH", "MERGE")]
        public IActionResult Patch([FromODataUri] int key, Delta<Feature> updateFeatureRequestModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Feature feature = _featuresManager.Get(key);
            if (feature == null)
            {
                return NotFound();
            }
            updateFeatureRequestModel.Patch(feature);
            _featuresManager.Update(feature);
            
            return Updated(feature);
        }

        [AcceptVerbs("DELETE")]
        public IActionResult Delete([FromODataUri] int key)
        {
            try
            {
                _featuresManager.Delete(key);
                return NoContent();
            }
            catch (Exception e)
            {
                Logger.Logger.LogError("Deleting failed.", e);
                return BadRequest();
            }
        }

        [AcceptVerbs("POST")]
        public IActionResult Post([FromBody] Feature feature)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _featuresManager.Create(feature);

            return Created(feature);
        }
    }
}