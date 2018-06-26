using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL;
using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    public class DefectsController : ODataController
    {
        private IDefectsManager _manager;
        private IRepository<Defect> _defect;
        private DataContext _db;

        public DefectsController(DataContext db, IRepository<Defect> repository, IDefectsManager manager)
        {
            _db = db;
            _defect = repository;
            _manager = manager;
        }

        [EnableQuery]
        public IQueryable GetDefects()
        {            
            var result = _defect.GetAll();
            
            return result;
        }
    }
    
}