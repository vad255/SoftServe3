using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using System.Linq;

namespace BL
{
    public interface ITeamsManager
    {
        IQueryable<Team> GetUnemployedTeams();
        void Delete(int key);
    }
}
