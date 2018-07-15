using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL.Chatting
{
    public interface IRetrospectiveChatMananger : IChatManager
    {
        void AddRetrospectiveMessage(RetrospectiveMessage text);
    }
}
