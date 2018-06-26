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

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    public class FeatureController : Controller 
    {
        private IRepository<Feature> featureRepository;

        public FeatureController(IRepository<Feature> featureRepository)
        {
            this.featureRepository = featureRepository;
        }

        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(featureRepository.GetAll());
        }
    }
}