using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
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


      
        [NotMapped]
        public User AssignedToUser { get; set; }


        [NotMapped]
        public Feature Feature { get; set; }


        [NotMapped]
        public ProgramIncrement ProgramIncrement { get; set; }


        [Required]
        public Team Team { get; set; }


        [NotMapped]
        public Sprint Sprint { get; set; }


        [NotMapped]
        public StoryValue Value { get; set; }


        [NotMapped]
        public StoryEffort Effort { get; set; }


        [NotMapped]
        public List<AcceptanceCriteria> AC { get; set; }


        [NotMapped]
        public List<Defect> Defects { get; set; }



        [NotMapped]
        public Chat Chat { get; set; }
    }
}
