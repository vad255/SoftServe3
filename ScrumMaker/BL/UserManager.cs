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
    public class UserManager: IUserManager
    {
        public IUnitOfWork _unit;

        public UserManager(IUnitOfWork uof)
        {
            _unit = uof;
        }
    }
}
