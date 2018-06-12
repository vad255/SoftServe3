using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;


namespace DAL.Access.IRepositoryImplementation
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private DataContext db;
        private DbSet<T> dbSet;


        public Repository()
        {
            var optionBuilder = new DbContextOptionsBuilder<DataContext>();
            var options = optionBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=ScrumMaker;Trusted_Connection=True;MultipleActiveResultSets=true").Options;
            this.db = new DataContext(options);
            dbSet = db.Set<T>();
        }
        public IEnumerable<T> GetList()
        {
            return dbSet.ToList<T>();
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
            db.Entry(obj).State = EntityState.Modified;
        }
        public void Delete(int Id)
        {
            T getObjById = dbSet.Find(Id);
            dbSet.Remove(getObjById);
        }
        public void Save()
        {
            db.SaveChanges();
        }
        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
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
