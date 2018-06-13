using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;



namespace DAL.Models
{
    public class Team
    {
        [Key]
        public int Id { get; private set; }


        [Required]      
        public ICollection<User> Members { get; set; }


        [Required]
        public User ScrumMaster { get; set; }
    }
}
