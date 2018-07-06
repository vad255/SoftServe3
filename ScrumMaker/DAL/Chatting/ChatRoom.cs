using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;


namespace DAL.Chatting
{
    public class ChatRoom
    {
        public int Id { get; private set; }

        public string Name { get; set; }

        public virtual ICollection<User> Members { get; set; }

        public virtual ICollection<Message> Message { get; set; }
    }
}
