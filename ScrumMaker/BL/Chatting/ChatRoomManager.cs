using System;
using System.Collections.Generic;
using System.Text;
using DAL.Chatting;
using DAL.Models;
using DAL.Access;
using Microsoft.AspNetCore.SignalR;


namespace BL.Chatting
{
    public class ChatRoomManager : IChatManager
    {
        private IRepository<ChatRoom> _chatsRepository;
        private IHubContext<SimpleChat> _hubContext;


        public ChatRoomManager(IRepository<ChatRoom> chats, IHubContext<SimpleChat> hubContext)
        {
            _chatsRepository = chats;
            _hubContext = hubContext;
        }     

        private ChatRoom _room;


        public void SendAll(Message msg)
        {
            _hubContext.Clients.All.SendAsync("ReceiveMessage", msg.ToString());
        }
    }
}
