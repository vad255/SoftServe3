using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using BL.Chatting;
using DAL.Chatting;
using Newtonsoft.Json;

namespace ScrumMaker.Controllers.Chatting
{
    public class GlobalChat : Hub
    {
        private IGlobalChatManager _manager;

        public GlobalChat(IGlobalChatManager manager)
        {
            _manager = manager;
            Console.WriteLine("Hub created");
        }

        public async Task SendMessage(string text)
        {
            _manager.User = Context.User;

            Message msg = _manager.AddMessage(text);
            string msgJSON = msg.ToJSON();


            await Clients.Group(_manager.GetGroupIdentifier).SendAsync("receiveMessage", msgJSON);
        }

        public async Task GetHistory()
        {
            var history = _manager.GetHistory().Select(m => m.ToJSON());

           
            foreach (var item in history)
                Console.WriteLine(item);

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
