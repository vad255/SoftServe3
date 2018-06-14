using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using DAL.Stubs;

namespace DAL.Models
{
    public class Feature
    {
        [Key]
        public int FeatureId { get; set; }

        [Required]
        [MaxLength(30)]
        public string FeatureName{ get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        public FeatureState State { get; set; }

        [NotMapped]
        public ProgramIncrement ProgramIncrement { get; set; }

        [NotMapped]
        public User Owner { get; set; }

        [Required]
        public bool Blocked { get; set; }

        public ICollection<Story> Stories { get; set; }
    }
}
