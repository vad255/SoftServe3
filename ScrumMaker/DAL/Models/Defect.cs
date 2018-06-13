using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
                
        public string Priority { get; set; }

        public string State { get; set; }

        public status Status { get; set; }

        public string ProgramIncrement { get; set; }

        public string AssignedTo { get; set; }

        public string Sprint { get; set; }

        public string StepsToReproduse { get; set; }

        public string ExpectedResults { get; set; }

        public string ActualResults { get; set; }

        public string FixResults { get; set; }

        public string Attachments { get; set; }

        public blocked Blocked { get; set; }

        public string Chat { get; set; }

    }
}
