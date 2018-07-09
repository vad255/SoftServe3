using System;
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

        [ForeignKey("User")]
        public int? AuthorId { get; set; }
        public virtual User Author { get; set; }

        [NotMapped]
        public string AuthorName
        {
            get
            {
                return Author?.Login;
            }
        }


        public int ChatId { get; set; }
        public virtual ChatRoom Chat { get; set; }

        public override string ToString()
        {
            return $"({Sent.ToLocalTime()}){AuthorName ?? "Anonym"} : {Text}";
        }
    }
}
