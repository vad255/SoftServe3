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
    public class TeamsManager: ITeamsManager
    {
        public IUnitOfWork _unit;

        public TeamsManager(IUnitOfWork uof)
        {
            _unit = uof;
        }

        public IQueryable<Team> GetUnemployedTeams()
        {
            var sprints = _unit.Sprints;
            var teams = _unit.Teams;

            var teamsInSprint = sprints.GetAll().Select(s => s.Team);
            var result = teams.GetAll().Except(teamsInSprint);

            return result;
        }

        public void Delete(int id)
        {
            _unit.Teams.Delete(id);
            _unit.Commit();
        }
    }
}
