using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class RetrospectiveMeeting
    {
        [Key]
        public int Id { get; private set; }

        public ICollection<RetrospectiveMessage> Messages { get; set; }

        public string MeetingInfo { get; set; }

        [ForeignKey("Sprint")]
        public int? SprintId { get; set; }
        public Sprint Sprint { get; set; }
    }
}
