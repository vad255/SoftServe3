using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BL.Chatting;
using DAL.Chatting;

using static BL.ClaimsKeys;

namespace ScrumMaker.Controllers.Chatting
{

    public class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public DateTime BDate { get; set; }
        public object Object { get; set; }
    }

    public class ChatController : Controller
    {

        IChatManager _manager;

        public ChatController(IChatManager manager)
        {
            _manager = manager;
        }

        [HttpPost]
        [Route("api/chat/connect")]
        public void Connect()
        {
            Console.BackgroundColor = ConsoleColor.Red;
            Console.WriteLine("Connect");
            Console.BackgroundColor = ConsoleColor.Black;
        }

        [HttpPost]
        [Route("api/chat/send")]
        public void Send([FromBody] string text)
        {
            string sender = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == LOGIN)?.Value;
            int senderId = int.Parse(HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == ID)?.Value);

            Console.BackgroundColor = ConsoleColor.Cyan;
            Console.ForegroundColor = ConsoleColor.Black;
            Console.WriteLine($"{sender}: {text}");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.BackgroundColor = ConsoleColor.Black;


            Message msg = new Message()
            {
                AuthorId = senderId,
                AuthorName = sender,
                Text = text
            };

            _manager.SendAll(msg);
        }


        [HttpGet]
        [Route("api/chat/getmessage")]
        public IActionResult testData()
        {
            return Ok(new Message() { ChatId = 0, Id = 1, Sent = DateTime.Now, Text = "Hello World", Chat = null });
        }


    }
}
