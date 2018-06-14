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

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    public class FeatureController : Controller 
    {
        private IRepository<DAL.Models.Feature> featureRepository;

        public FeatureController(IServiceProvider serviceProvider)
        {
            featureRepository = serviceProvider.GetService<IRepository<DAL.Models.Feature>>();
        }

        [HttpGet("[action]")]
        public IEnumerable<Feature> FeatureGet()
        {
            var result = featureRepository.GetList();
            return result;
        }
    }
}