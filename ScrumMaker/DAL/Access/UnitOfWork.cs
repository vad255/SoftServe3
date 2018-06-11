using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace DAL.Access
{
    /// <summary>
    /// Represent DataBase transaction.QUESTION OF SYNCRONIZATION  IS OPEN 
    /// </summary>
    public class UnitOfWork : IUnitOfWork
    {
        DbContext _context;

        INotCommitableRepository<User> _users;
        INotCommitableRepository<Story> _stories;

        public UnitOfWork(DbContext context)
        {
            _context = context;
        }


        /// <summary>
        /// need to create same property for everyone model
        /// </summary>
        public INotCommitableRepository<User> Users
        {
            get
            {
                if (_users == null)
                    _users = new EFRepository<User>(_context);
                return _users;
            }
        }



        public INotCommitableRepository<Story> Stories
        {
            get
            {
                if (_stories == null)
                    _stories = new EFRepository<Story>(_context);
                return _stories;
            }
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }



        private void Dispose(bool disposing)
        {

            if (!disposing)
                return;

            _context?.Dispose();
            _context = null;

        }
   
    }

}

