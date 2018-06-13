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
<<<<<<< HEAD
        public int TeamId { get; set; }
        public int Role { get; set; }
        public bool Activity { get; set; }
=======
        [Required]
        public int RoleId { get; set; }


>>>>>>> master
    }
}
