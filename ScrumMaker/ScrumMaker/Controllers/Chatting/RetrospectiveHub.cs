using BL.Chatting;
using DAL.Chatting;
using DAL.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ScrumMaker.Controllers.Chatting
{
    public class RetrospectiveHub : Hub
    {
        private IRetrospectiveChatMananger _manager;

        public RetrospectiveHub(IRetrospectiveChatMananger manager)
        {
            _manager = manager;
        }

        public async Task SendMessage(RetrospectiveMessage message)
        {
            _manager.User = Context.User;
           
            await Clients.Group(_manager.GetGroupIdentifier).SendAsync("receiveMessage", message);

            _manager.AddRetrospectiveMessage(message);
        }

        public async Task GetHistory()
        {
            var history = _manager.GetHistory().Select(m => m.ToString());
            await Clients.Caller.SendAsync("receiveHistory", history);
        }

        public async Task GetUsers()
        {
            await Clients.Caller.SendAsync("receiveUsers", _manager.GetOnlineUsers());
        }


        public override async Task OnConnectedAsync()
        {
            _manager.User = Context.User;
            DAL.Models.User user = _manager.Connect();
            await Clients.Group(_manager.GetGroupIdentifier).SendAsync("userConnected", user);
            await Groups.AddToGroupAsync(Context.ConnectionId, _manager.GetGroupIdentifier);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            _manager.User = Context.User;
            DAL.Models.User user = _manager.Disconnect();
            await Clients.Group(_manager.GetGroupIdentifier).SendAsync("userDisconnect", user);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, _manager.GetGroupIdentifier);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
