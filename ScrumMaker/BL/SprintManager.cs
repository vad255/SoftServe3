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
    public class SprintManager: ISprintManager
    {
        public IUnitOfWork _unit;

        public SprintManager(IUnitOfWork uof)
        {
            _unit = uof;
        }

        public IEnumerable<Sprint> Get()
        {
            var sprints = _unit.Sprints.GetAll().Include(s => s.History).Include(s => s.Team).Include(s => s.Team.Members);

            List<Sprint> result = sprints.ToList();

            result = sprints.ToList();

            return result;
        }
    }
}
