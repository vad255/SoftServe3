﻿using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace DAL.Models
{
    public class Team
    {
        public int Id { get; private set; }

        [Required]
        public string Name { get; set; }

        public virtual ICollection<User> Members { get; set; }

    }
}
