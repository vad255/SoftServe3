﻿using System;
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

        [Required(ErrorMessage = "DefectName is required")]
        public string DefectName { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }
                
        public DefectPriority Priority { get; set; }

        public DefectState State { get; set; }

        public DefectStatus Status { get; set; }

        [NotMapped]
        public string ProgramIncrement { get; set; }

        [ForeignKey("User")]
        public int? AssignedToId { get; set; }
        public virtual User AssignedTo { get; set; }

        [ForeignKey("Sprint")]
        public int? SprintId { get; set; }
        public virtual Sprint Sprint { get; set; }

        public string StepsToReproduse { get; set; }

        public string ExpectedResults { get; set; }

        public string ActualResults { get; set; }

        public string FixResults { get; set; }

        public string Attachments { get; set; }

        public Blocked Blocked { get; set; }

       // public string Chat { get; set; }

    }
}
