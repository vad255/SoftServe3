using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Access
{

    /// <summary>
    /// Provide CRUD access to one 'DBtable'
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IRepository<T> :INotCommitableRepository<T> where T : class
    {
        void Save();
    }
}
