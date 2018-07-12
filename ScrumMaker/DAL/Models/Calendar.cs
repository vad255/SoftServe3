using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class Calendar
    {
        [Key]
        public int CalendarId { get; set; }
        [Required]
        public DateTime Date { get; set; }

        public int? UserId { get; set; }
        public User User { get; set; }

        public int? TeamId { get; set; }
        public Team Team { get; set; }

        [Required]
        public int MeetingId { get; set; }
        public Meetings Meetings { get; set; }
        [Required]
        public int Hours { get; set; }
    }
}
