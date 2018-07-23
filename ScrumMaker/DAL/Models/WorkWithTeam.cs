using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class WorkWithTeam
    {
        public string TeamName { get; set; }
        public List<User> Users { get; set; }
    }
}
