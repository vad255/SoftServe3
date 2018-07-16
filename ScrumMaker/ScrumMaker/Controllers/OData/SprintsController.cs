using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.OData;

using DAL.Models;
using DAL.Access;

namespace ScrumMaker.Controllers
{

    public class SprintsController : ODataController
    {
        private IRepository<Sprint> _sprints;

        public SprintsController(IRepository<Sprint> repository)
        {
            _sprints = repository;
        }

        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_sprints.GetAll());
        }


        [AcceptVerbs("PATCH", "MERGE")]
        public IActionResult Patch([FromODataUri] int key, [FromBody] Delta<Sprint> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Sprint sprint = _sprints.GetById(key);

            if (sprint == null)
            {
                return NotFound();
            }

            patch.Patch(sprint);

            try
            {
                _sprints.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_sprints.GetById(key) == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(sprint);
        }


        [AcceptVerbs("DELETE")]
        public IActionResult Delete([FromODataUri] int key)
        {
            _sprints.Delete(key);
            _sprints.Save();
            return NoContent();
        }
    }
}
