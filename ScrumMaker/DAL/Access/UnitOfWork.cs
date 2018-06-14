using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace DAL.Access
{
    /// <summary>
    /// Represent DataBase transaction. QUESTION OF SYNCRONIZATION  IS OPEN 
    /// Probably, need DI
    /// </summary>
    public class UnitOfWork : IUnitOfWork
    {
        DbContext _context;

        IRepository<User> _users;
        IRepository<Team> _teams;
        IRepository<Story> _stories;
        IRepository<Sprint> _sprints;
        IRepository<Defect> _defects;
        IRepository<Feature> _features;



        public UnitOfWork(DbContext context)
        {
            _context = context;
        }

     
        public IRepository<User> Users
        {
            get
            {
                if (_users == null)
                    _users = new Repository<User>(_context);
                return _users;
            }
        }

        public IRepository<Team> Teams
        {
            get
            {
                if (_teams == null)
                    _teams = new Repository<Team>(_context);
                return _teams;
            }
        }

        public IRepository<Story> Stories
        {
            get
            {
                if (_stories == null)
                    _stories = new Repository<Story>(_context);
                return _stories;
            }
        }

        public IRepository<Sprint> Sprints
        {
            get
            {
                if (_sprints == null)
                    _sprints = new Repository<Sprint>(_context);
                return _sprints;
            }
        }

        public IRepository<Defect> Defects
        {
            get
            {
                if (_defects == null)
                    _defects = new Repository<Defect>(_context);
                return _defects;
            }
        }

        public IRepository<Feature> Features
        {
            get
            {
                if (_features == null)
                    _features = new Repository<Feature>(_context);
                return _features;
            }
        }

  

        public void Commit()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context?.Dispose();
            _context = null;
        }
   
    }

}

