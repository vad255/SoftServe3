using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Login { get; set; }
   

        [Required]
        [MaxLength(50)]
        public string Password { get; set; }


        [ForeignKey("Role")]
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }


        [ForeignKey("Team")]
        public int? TeamId { get; set; }
        public virtual Team Team { get; set; }

        public bool Activity { get; set; }

        [ForeignKey("Photo")]
        public int? PhotoId { get; set; }
        public virtual Photo Photo { get; set; }
    }
}