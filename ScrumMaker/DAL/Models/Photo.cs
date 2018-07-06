using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class Photo
    {
        [Key]
        public int PhotoId { get; set; }

        public byte[] UserPhoto { get; set; }

        [Required]
        public int UserId { get; set; }

    }
}
