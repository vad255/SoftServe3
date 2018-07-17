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
    public class TasksController : ODataController
    {

        private IRepository<ScrumTask> _tasks;


        public TasksController(IRepository<ScrumTask> tasks)
        {
            _tasks = tasks;

        }
        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_tasks.GetAll());
        }


    }
}
