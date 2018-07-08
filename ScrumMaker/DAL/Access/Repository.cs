using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace DAL.Access
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private DbContext _context;
        private DbSet<T> _dbSet;


        public Repository(DbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public IQueryable<T> GetAll()
        {
            return _dbSet;
        }

        public T GetById(int id)
        {
            return _dbSet.Find(id);
        }

        public void Create(T obj)
        {
            _dbSet.Add(obj);
        }

        public void Update(T obj)
        {
            _context.Entry(obj).State = EntityState.Modified;
        }

        public void Delete(int Id)
        {
            T getObjById = _dbSet.Find(Id);
            _dbSet.Remove(getObjById);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
     

        public void Dispose()
        {
            _context?.Dispose();
            _context = null;
            _dbSet = null;    
        }

    }
}
