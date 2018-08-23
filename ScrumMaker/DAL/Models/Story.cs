using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DAL.Stubs;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace DAL.Models
{
    public class Story
    {
        [Key]
        public int Id { get; private set; }

        [Required]
        [MaxLength(30)]
        public string Name { get; set; }

        [Required]
        [MaxLength(500)]
        public String Description { get; set; }

        public StoryStatus Status { get; set; }

        [ForeignKey("User")]
        public int? UserId { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("Feature")]
        public int? FeatureId { get; set; }
        public virtual Feature Feature { get; set; }

        [ForeignKey("Team")]
        public int? TeamId { get; set; }
        public virtual Team Team { get; set; }

        [ForeignKey("Sprint")]
        public int? SprintId { get; set; }
        public virtual Sprint Sprint { get; set; }

        public ICollection<Defect> Defects { get; set; }

        public virtual ICollection<ScrumTask> Tasks { get; set; }

        public int? PokerMark { get; set; }
    }
}
