using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class ScrumTask
    {
        [Key]
        public int TaskId { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }
        public DateTime? Started { get; set; }
        public DateTime? Completed { get; set; }
        [ForeignKey("Story")]
        public int? StoryId { get; set; }
        public virtual Story Story { get; set; }

        public int PlannedHours { get; set; }

        public int RemainingHours { get; set; }

        public int ActualHours { get; set; }

        [Required]
        public string Type { get; set; }

        [DefaultValue("Draft")]
        public string State { get; set; }


        [MaxLength(500)]
        public string Blocked { get; set; }

        [Required]
        public User AssignedTo { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }

        [MaxLength(500)]
        public string WorkNotes { get; set; }
        
    }
}
