using System;
using System.Collections.Generic;
using System.Text;
using DAL.Chatting;
using DAL.Models;
using System.Linq;

namespace BL.Chatting
{
    public interface IChatManager
    {
        string GetGroupIdentifier { get; }
        System.Security.Claims.ClaimsPrincipal User { get; set; }

        User Connect();
        User Disconnect();

        Message AddMessage(string text);
        IEnumerable<User> GetOnlineUsers();
        IQueryable<Message> GetHistory();
        IQueryable<Message> GetHistory(int skip, int top);
    }
}
