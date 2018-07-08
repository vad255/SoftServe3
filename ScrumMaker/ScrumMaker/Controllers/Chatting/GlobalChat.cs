using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using BL.Chatting;
using DAL.Chatting;


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

            await Groups.AddToGroupAsync(Context.ConnectionId, _manager.GetGroupIdentifier);
            Message msg = _manager.AddMessage(text);
            await Clients.Group(_manager.GetGroupIdentifier).SendAsync("receiveMessage", msg.ToString());
        }

        public async Task GetHistory()
        {
            var history = _manager.GetHistory().Select(m => m.ToString());

            await Clients.Caller.SendAsync("receiveHistory", history);
        }
    }
}
