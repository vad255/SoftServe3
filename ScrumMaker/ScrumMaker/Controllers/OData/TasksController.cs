﻿using System;
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
using ScrumMaker.Attributes;

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    public class TasksController : ODataController
    {

        private IRepository<ScrumTask> _tasks;


        public TasksController(IRepository<ScrumTask> tasks)
        {
            _tasks = tasks;

        }

        [RefreshToken]
        [CookieAuthorize]
        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_tasks.GetAll());
        }

        [AcceptVerbs("PATCH", "MERGE")]
        public IActionResult Patch([FromODataUri] int key, [FromBody] Delta<ScrumTask> patch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ScrumTask task = _tasks.GetById(key);

            if (task == null)
            {
                return NotFound();
            }

            patch.Patch(task);

            try
            {
                _tasks.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(task);
        }

        private bool TaskExists(int key)
        {
            return _tasks.GetAll().Count(e => e.TaskId == key) > 0;
        }


        //[AcceptVerbs("DELETE")]
        //public IActionResult Delete([FromODataUri] int key)
        //{
        //    _tasks.Delete(key);
        //    _tasks.Save();
        //    return NoContent();
        //}

        [AcceptVerbs("DELETE")]
        public bool Delete([FromODataUri] int key)
        {
            if (TaskExists(key))
            {
                _tasks.Delete(key);
                _tasks.Save();
                return false;
            }
            else
            {

                return true;
            }
        }


        [AcceptVerbs("POST")]
        public IActionResult Post([FromBody]  ScrumTask task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _tasks.Create(task);
            _tasks.Save();

            return Created(task);
        }

    }
}

