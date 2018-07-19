using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using DAL.Models;
using DAL.Chatting;


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
        IRepository<ChatRoom> _chats;
        IRepository<Message> _messages;
        IRepository<SprintReview> _sprintReviews;

        public UnitOfWork(DbContext context)
        {
            _context = context;
        }


        public IRepositoryUoW<User> Users
        {
            get
            {
                if (_users == null)
                    _users = new Repository<User>(_context);
                return _users;
            }
        }

        public IRepositoryUoW<Team> Teams
        {
            get
            {
                if (_teams == null)
                    _teams = new Repository<Team>(_context);
                return _teams;
            }
        }

        public IRepositoryUoW<Story> Stories
        {
            get
            {
                if (_stories == null)
                    _stories = new Repository<Story>(_context);
                return _stories;
            }
        }

        public IRepositoryUoW<Sprint> Sprints
        {
            get
            {
                if (_sprints == null)
                    _sprints = new Repository<Sprint>(_context);
                return _sprints;
            }
        }

        public IRepositoryUoW<Defect> Defects
        {
            get
            {
                if (_defects == null)
                    _defects = new Repository<Defect>(_context);
                return _defects;
            }
        }

        public IRepositoryUoW<Feature> Features
        {
            get
            {
                if (_features == null)
                    _features = new Repository<Feature>(_context);
                return _features;
            }
        }

        public IRepositoryUoW<SprintReview> SprintReviews
        {
            get
            {
                if (_sprintReviews == null)
                    _sprintReviews = new Repository<SprintReview>(_context);
                return _sprintReviews;
            }
        }

        public IRepositoryUoW<ChatRoom> Chats
        {
            get
            {
                _chats = _chats ?? new Repository<ChatRoom>(_context);
                return _chats;
            }
        }

        public IRepositoryUoW<Message> Messages
        {
            get
            {
                _messages = _messages ?? new Repository<Message>(_context);
                return _messages;
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

