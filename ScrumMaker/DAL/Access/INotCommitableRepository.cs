using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Access
{
    /// <summary>
    /// For using in Unit Of Work 
    /// </summary>
    /// <typeparam name="T">Type of your model</typeparam>
    public interface INotCommitableRepository<T> : IDisposable where T: class
    {
        IEnumerable<T> Get();
        T GetById(int id);
        void Insert(T en);
        void Delete(int enId);
        void Update(T en);
    }
}
