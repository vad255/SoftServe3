using DAL.Chatting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class RetrospectiveMessage
    {
        [Key]
        public int Id { get; set; }

        public DateTime SendingDate { get; set; }

        public string WentWell { get; set; }

        public string CouldBeImproved { get; set; }

        public string CommitToDoing { get; set; }

        [ForeignKey("User")]
        public int? UserId { get; set; }
        public virtual User User { get; set; }

        public string UserName { get; set; }

        public int ChatId { get; set; }
        public virtual ChatRoom Chat { get; set; }

        [ForeignKey("RetrospectiveMeeting")]
        public int? MeetingId { get; set; }
        public virtual RetrospectiveMeeting Meeting { get; set; }
    }
}
