using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace DAL.Models
{
    public class Team
    {
        [Key]
        public int Id { get; private set; }


        [Required]    
        public List<User> Members { get; set; }


        [Required]
        public User ScrumMaster { get; set; }
    }
}
