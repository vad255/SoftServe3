using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Defect
    {
        [Key]
        public int DefectId { get; private set; }
        
        public string DefectName { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }
                
        public Priority Priority { get; set; }

        public State State { get; set; }

        public Status Status { get; set; }

        [NotMapped]
        public string ProgramIncrement { get; set; }

        public User AssignedTo { get; set; }

        public Sprint Sprint { get; set; }

        public string StepsToReproduse { get; set; }

        public string ExpectedResults { get; set; }

        public string ActualResults { get; set; }

        public string FixResults { get; set; }

        public string Attachments { get; set; }

        public Blocked Blocked { get; set; }

       // public string Chat { get; set; }

    }
}
