using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace DAL.Access
{
    /// <summary>
    /// Cut version of repository for using in UoW pattern
    /// </summary>
    public interface IRepositoryUoW<T> : IDisposable where T : class
    {
        IQueryable<T> GetAll();
        T GetById(int id);
        void Create(T item);
        void Delete(int enId);
        void Update(T en);
    }
}
