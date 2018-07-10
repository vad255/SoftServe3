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

namespace ScrumMaker.Controllers
{
    public class FeatureController : ODataController 
    {
        private IRepository<Feature> featureRepository;
        private IRepository<Story> storyRepository;
        
        public FeatureController(IRepository<Feature> featureRepository, IRepository<Story> storyRepository)
        {
            this.featureRepository = featureRepository;
            this.storyRepository = storyRepository;
        }


        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(featureRepository.GetAll());
        }

        [EnableQuery]
        public IActionResult GetById(int id)
        {
            return Ok(featureRepository.GetById(id));
        }
        
        [AcceptVerbs("PATCH", "MERGE")]
        public IActionResult Patch([FromODataUri] int key, Delta<Feature> updateFeatureRequestModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Feature feature =  featureRepository.GetById(key);
            if (feature == null)
            {
                return NotFound();
            }
            updateFeatureRequestModel.Patch(feature);
            featureRepository.Save();
            
            return Updated(feature);
        }
    }
}