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
        private DbSet<T> dbSet;


        public Repository(DbContext context)
        {
            _context = context;
            dbSet = _context.Set<T>();
        }

        public IQueryable<T> GetAll()
        {
            return dbSet;
        }

        public T GetById(int id)
        {
            return dbSet.Find(id);
        }

        public void Create(T obj)
        {
            dbSet.Add(obj);
        }
        public void Update(T obj)
        {
            _context.Entry(obj).State = EntityState.Modified;
        }
        public void Delete(int Id)
        {
            T getObjById = dbSet.Find(Id);
            dbSet.Remove(getObjById);
        }
        public void Save()
        {
            _context.SaveChanges();
        }
        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }

                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}
