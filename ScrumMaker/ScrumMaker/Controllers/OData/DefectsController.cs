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
using Microsoft.EntityFrameworkCore;

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
        public IActionResult Get()
        {            
            var result = _defect.GetAll();
            
            return Ok(result);
        }
    

    [AcceptVerbs("PATCH", "MERGE")]
    public IActionResult Patch([FromODataUri] int key, [FromBody] Delta<Defect> patch)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        Defect defect = _defect.GetById(key);

        if (defect == null)
        {
            return NotFound();
        }

        patch.Patch(defect);

        try
        {
            _defect.Save();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!DefectExists(key))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return Updated(defect);
    }

    private bool DefectExists(int key)
    {
        return _defect.GetAll().Count(e => e.DefectId == key) > 0;
    }
        [AcceptVerbs("DELETE")]
        public IActionResult Delete([FromODataUri] int key)
        {
            _defect.Delete(key);
            _defect.Save();
            return NoContent();
        }
    }
}

