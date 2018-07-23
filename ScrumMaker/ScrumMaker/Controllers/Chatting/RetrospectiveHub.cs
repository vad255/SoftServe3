using BL.Chatting;
using DAL.Chatting;
using DAL.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp;
    
namespace ScrumMaker.Controllers.Chatting
{
    public class RetrospectiveHub : Hub
    {

        private IRetrospectiveChatMananger _manager;

        public RetrospectiveHub(IRetrospectiveChatMananger manager)
        {
            _manager = manager;
        }

        public async Task SendMessage(RetrospectiveMessage message, int sprintId)
        {
            _manager.User = Context.User;

            message.SendingDate = _manager.GetCurrentDate();
            message.UserName = _manager.GetCurrentUserName();
            message.UserId = _manager.GetCurrentUserId();
            _manager.SprintId = sprintId;
            await Clients.Group(sprintId.ToString()).SendAsync("receiveMessage", message);

            _manager.AddRetrospectiveMessage(message);
        }

        public async Task GetHistory()
        {
            var history = _manager.GetHistory().Select(m => m.ToString());
            await Clients.Caller.SendAsync("receiveHistory", history);
        }

        public async Task GetUsers()
        {
            var httpContext1 = Context.GetHttpContext();
            var sprintId = httpContext1.Request.Query["Token"][0];

            await Clients.Caller.SendAsync("receiveUsers", _manager.GetOnlineUsersInfo(), int.Parse(sprintId));
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext1 = Context.GetHttpContext();
            var sprintId = httpContext1.Request.Query["Token"][0];

            _manager.User = Context.User;
            _manager.SprintId = int.Parse(sprintId);
            DAL.Models.User user = _manager.Connect();

            await Groups.AddToGroupAsync(Context.ConnectionId, sprintId);
            await Clients.Group(sprintId).SendAsync("userConnected", user);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var httpContext1 = Context.GetHttpContext();
            var sprintId = httpContext1.Request.Query["Token"][0];

            _manager.User = Context.User;
            DAL.Models.User user = _manager.Disconnect();
            await Clients.Group(sprintId).SendAsync("userDisconnect", user);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, sprintId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
