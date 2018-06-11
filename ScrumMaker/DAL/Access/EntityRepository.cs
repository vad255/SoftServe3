using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Microsoft.EntityFrameworkCore;

namespace DAL.Access
{
    public class EFRepository<T> : IRepository<T> where T  : class 
    {
        private DbContext _context;
        private DbSet<T> _entities;


        public EFRepository(DbContext context)
        {
            _context = context;
            _entities = context.Set<T>();
        }


        public IEnumerable<T> Get()
        {
            return _entities;
        }

        public T GetById(int id)
        {
            return _entities.Find(id);
        }

        public void Insert(T en)
        {
            _entities.Add(en);
        }

        public void Update(T en)
        {
            _entities.Attach(en);
            _context.Entry(en).State = EntityState.Modified;
        }

        public void Delete(int enId)
        {
            T entityToDelete = _entities.Find(enId);
            _entities.Remove(entityToDelete);
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
