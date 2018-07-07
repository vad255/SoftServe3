using System;
using System.Collections.Generic;
using System.Text;
using DAL.Chatting;
using System.Linq;

namespace BL.Chatting
{
    public interface IChatManager
    {
        string GetGroupIdentifier { get; }
        System.Security.Claims.ClaimsPrincipal User { get; set; }


        Message AddMessage(string text);
        IQueryable<Message> GetHistory();
        IQueryable<Message> GetHistory(int skip, int top);
    }
}
