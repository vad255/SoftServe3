using DAL.Models;
using System;


namespace DAL.Access
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Defect> Defects { get; }
        IRepository<Feature> Features { get; }
        IRepository<Sprint> Sprints { get; }
        IRepository<Story> Stories { get; }
        IRepository<Team> Teams { get; }
        IRepository<User> Users { get; }

        void Commit();
    }
}