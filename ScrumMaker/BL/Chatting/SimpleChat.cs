using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace BL.Chatting
{
    public class SimpleChat : Hub
    {
        public SimpleChat()
        {
            Console.BackgroundColor = ConsoleColor.Red;
            Console.WriteLine("Hub created");
            Console.BackgroundColor = ConsoleColor.Black;
        }

        

        //public async Task SendMessage(string sender, string message)
        //{
        //    await Clients.All.SendAsync("ReceiveMessage", message);
        //}
    }
}
