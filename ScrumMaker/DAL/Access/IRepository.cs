using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Access
{

    /// <summary>
    /// Provide CRUD access to one 'DBtable'
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IRepository<T> : IDisposable where T : class
    {
        IEnumerable<T> GetList();
        T GetById(int id);
        void Create(T item);
        void Delete(int enId);
        void Update(T en);
        void Save();
    }
}
