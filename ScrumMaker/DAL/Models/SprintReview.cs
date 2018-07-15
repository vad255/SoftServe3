using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class SprintReview
    {
        [Key]
        public int Id { get; private set; }

        [ForeignKey("Sprint")]
        [Required]
        public int SprintId { get; set; }
        public virtual Sprint Sprint { get; set; }

        [Required]
        public string Goal { get; set; }
    }
}
