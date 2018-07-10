﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DAL.Stubs;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Story
    {
        [Key]
        public int Id { get; private set; }

        [Required]
        [MaxLength(30)]
        public string Name { get; set; }

        [MaxLength(500)]
        public String Description { get; set; }

        public StoryStatus Status { get; set; }

        [ForeignKey("User")]
        public int? UserId { get; set; }
        public virtual User User { get; set; }

        public Feature Feature { get; set; }

        [NotMapped]
        public ProgramIncrement ProgramIncrement { get; set; }

        public Team Team { get; set; }

        [ForeignKey("Sprint")]
        public int? SprintId { get; set; }
        public Sprint Sprint { get; set; }

        [NotMapped]
        public StoryValue Value { get; set; }

        [NotMapped]
        public StoryEffort Effort { get; set; }

        [NotMapped]
        public ICollection<AcceptanceCriteria> AC { get; set; }

        public ICollection<Defect> Defects { get; set; }

        public virtual ICollection<ScrumTask> Tasks { get; set; }

        [NotMapped]
        public Chat Chat { get; set; }
    }
}
