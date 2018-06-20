using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    public class DefectsController : Controller
    {
        private IDefectsManager _manager;
        private IRepository<Defect> _defect;

        public DefectsController(IRepository<Defect> repository, IDefectsManager manager)
        {
            _defect = repository;
            _manager = manager;
        }

        [HttpGet("[action]")]
        public IEnumerable<Defect> GetDefects()
        {
            var result = _defect.GetAll();
            return result;
        }
    }
    
}