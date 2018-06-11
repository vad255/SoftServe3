using System;
using System.Collections.Generic;
using System.Net.NetworkInformation;
using System.Text;
using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Access.IRepositoryImplementation
{
    public class SQLUserRepository: IRepository<User>
    {
        private DataContext db;

        public SQLUserRepository()
        {
            var optionBuilder = new DbContextOptionsBuilder<DataContext>();
            var options = optionBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=ScrumMaker;Trusted_Connection=True;MultipleActiveResultSets=true").Options;
            this.db = new DataContext(options);
        }

        public IEnumerable<User> GetList()
        {
            return db.Users;
        }

        public void Create(User user)
        {
            db.Users.Add(user);
        }

        public void Update(User user)
        {
            db.Entry(user).State = EntityState.Modified;
        }

        public void Delete(int enId)
        {
            User user = db.Users.Find(enId);
            if (user != null)
            {
                db.Users.Remove(user);
            }
        }

        public User GetById(int id)
        {
            return db.Users.Find(id);
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
