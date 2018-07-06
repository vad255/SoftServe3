﻿using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using System.ComponentModel.DataAnnotations.Schema;


namespace DAL.Chatting
{
    public class Message
    {
        public int Id { get; set; }

        public DateTime Sent { get; set; }
        public string Text { get; set; }

        public int? AuthorId { get; set; }
        public User Author { get; set; }

        [NotMapped]
        public string AuthorName { get; set; }


        public int ChatId { get; set; }
        public ChatRoom Chat { get; set; }

        public override string ToString()
        {
            return $"{AuthorName} : {Text}";
        }
    }
}
