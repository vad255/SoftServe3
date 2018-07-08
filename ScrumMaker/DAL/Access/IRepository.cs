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
    public interface IRepository<T> : IRepositoryUoW<T> where T : class
    {
        void Save();
    }
}
