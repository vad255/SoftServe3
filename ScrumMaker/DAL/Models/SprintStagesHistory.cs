using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class SprintStagesHistory
    {
        public int Id { get; set; }

        public DateTime? Initiated { get; set; }
        public DateTime? Planned { get; set; }
        public DateTime? Begined { get; set; }
        public DateTime? ReviewDone { get; set; }
        public DateTime? RetrospectiveDone { get; set; }
    }
}
