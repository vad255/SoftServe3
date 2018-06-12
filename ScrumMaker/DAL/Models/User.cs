using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class User
    {
        public int UserId { get; set; }


        [Required]
        [MaxLength(20)]
        public string Login { get; set; }


        [Required]
        [MaxLength(20)]
        public string Password { get; set; }

    }
}
