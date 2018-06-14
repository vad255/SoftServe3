using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;


namespace DAL.Access
{

    /// <summary>
    /// Provide CRUD access to one 'DBtable'
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IRepository<T> : IDisposable where T : class
    {
        IQueryable<T> GetAll();
        T GetById(int id);
        void Create(T item);
        void Delete(int enId);
        void Update(T en);
        void Save();
    }
}
