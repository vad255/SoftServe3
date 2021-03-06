﻿using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL.Chatting
{
    public interface IRetrospectiveChatMananger : IChatManager
    {
        IEnumerable<UserInfo> GetOnlineUsersInfo();
        void AddRetrospectiveMessage(RetrospectiveMessage text);
        int GetCurrentUserId();
        string GetCurrentUserName();
        DateTime GetCurrentDate();
        int SprintId { get; set; }
    }
}
