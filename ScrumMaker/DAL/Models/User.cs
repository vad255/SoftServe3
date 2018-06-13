using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }


        [Required]
        [MaxLength(20)]
        public string Login { get; set; }


        [Required]
        [MaxLength(20)]
        public string Password { get; set; }
        [Required]
        public int RoleId { get; set; }


    }
}
