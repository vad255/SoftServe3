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
    class TeamsManager: ITeamsManager
    {
        public IUnitOfWork _unit;

        public TeamsManager(IUnitOfWork uof)
        {
            _unit = uof;
        }
    }
}
