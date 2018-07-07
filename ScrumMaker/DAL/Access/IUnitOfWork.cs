using DAL.Models;
using System;
using DAL.Chatting;

namespace DAL.Access
{
    public interface IUnitOfWork : IDisposable
    {
        IRepositoryUoW<Defect> Defects { get; }
        IRepositoryUoW<Feature> Features { get; }
        IRepositoryUoW<Sprint> Sprints { get; }
        IRepositoryUoW<Story> Stories { get; }
        IRepositoryUoW<Team> Teams { get; }
        IRepositoryUoW<User> Users { get; }
        IRepositoryUoW<ChatRoom> Chats { get; }
        IRepositoryUoW<Message> Messages { get; }


        void Commit();
    }
}