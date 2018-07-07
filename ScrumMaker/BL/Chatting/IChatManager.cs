using System;
using System.Collections.Generic;
using System.Text;
using DAL.Chatting;

namespace BL.Chatting
{
    public interface IChatManager
    {
        void SendAll(Message msg);
    }
}
