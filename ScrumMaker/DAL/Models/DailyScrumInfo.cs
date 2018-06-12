using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;


namespace DAL.Models
{
    public class DailyScrumInfo
    {
        [Key]
        public string Id { get; private set; }


        [Required]
        public string Description { get; set; }


        [Required]
        public DateTime Сonducted { get; set; }
    }
}
