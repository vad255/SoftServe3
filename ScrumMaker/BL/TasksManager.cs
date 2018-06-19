using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BL
{
    public class TasksManager:ITasksManager
    {        
        public IUnitOfWork _unit;

        public TasksManager(IUnitOfWork uof)
        {
            _unit = uof;
        }
    }
}
