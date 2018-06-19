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

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    public class FeatureController : Controller 
    {
        private IFeaturesManager _manager;
        private IRepository<DAL.Models.Feature> featureRepository;

        public FeatureController(IServiceProvider serviceProvider, IFeaturesManager manager)
        {
            featureRepository = serviceProvider.GetService<IRepository<DAL.Models.Feature>>();
            _manager = manager;
        }

        [HttpGet("[action]")]
        public IEnumerable<Feature> FeatureGet()
        {
            var result = featureRepository.GetAll();
            return result;
        }
    }
}