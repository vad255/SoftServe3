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

    public class SprintStagesHistoryController : ODataController
    {
        private IRepository<SprintStagesHistory> _history;

        public SprintStagesHistoryController(IRepository<SprintStagesHistory> repository)
        {
            _history = repository;
        }

        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_history.GetAll());
        }

        public IActionResult Post([FromBody]SprintStagesHistory item)
        {
            _history.Create(item);
            _history.Save();
            return Created(item);
        }


        [AcceptVerbs("PATCH", "MERGE")]
        public IActionResult Patch([FromODataUri] int key, [FromBody] Delta<SprintStagesHistory> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SprintStagesHistory history = _history.GetById(key);

            if (history == null)
            {
                return NotFound();
            }

            patch.Patch(history);

            try
            {
                _history.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_history.GetById(key) == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(history);
        }


        [AcceptVerbs("DELETE")]
        public IActionResult Delete([FromODataUri] int key)
        {
            _history.Delete(key);
            _history.Save();
            return NoContent();
        }
    }
}
