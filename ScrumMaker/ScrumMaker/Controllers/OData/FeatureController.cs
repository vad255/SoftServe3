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

        [RefreshToken]
        [CookieAuthorize]
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

        private bool FeatureExists(int key)
        {
            return _featuresManager.GetAll().Count(e => e.Id == key) > 0;
        }

        [RefreshToken]
        [CookieAuthorize]
        [AcceptVerbs("DELETE")]
        public bool Delete([FromODataUri] int key)
        {
            if (FeatureExists(key))
            {
                _featuresManager.Delete(key);
                return false;
            }
            else
            {

                return true;
            }
        }

        [RefreshToken]
        [CookieAuthorize]
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