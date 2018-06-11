using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Access
{
    public interface IUnitOfWork : IDisposable
    {
        void Save();
    }
}
