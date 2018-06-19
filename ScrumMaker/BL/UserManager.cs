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
    public class UserManager:IUserManager
    {
       /* IConfiguration configuration;
        DbContextOptions options;
        public UnitOfWork unit;

        public UserManager()
        {
            options = new DbContextOptionsBuilder().UseSqlServer(configuration.GetConnectionString("Mikle")).Options;
            DbContext context = new DataContext(options);
            unit = new UnitOfWork(context);
        }*/

        public IUnitOfWork _unit;

        public UserManager(IUnitOfWork uof)
        {
            _unit = uof;
        }
    }
}
