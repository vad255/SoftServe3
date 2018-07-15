using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class Meetings
    {
        [Key]
        public int MeetingId { get; set; }
        [Required]
        public string MeetingName { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
