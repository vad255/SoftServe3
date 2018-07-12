using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using System.Text;

namespace DAL.Models
{
    public class ScrumTask
    {
        [Key]
        public int TaskId { get; set; }

        [Required]
        public string Summary { get; set; }

        [ForeignKey("Story")]
        public int StoryId { get; set; }
        public virtual Story Story { get; set; }

        public int PlannedHours { get; set; }
        public DateTime? Started { get; set; }
        public DateTime? Completed { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string State { get; set; }

        public bool Blocked { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }

        [NotMapped]
        public string WorkNotes { get; set; }

    }
}
