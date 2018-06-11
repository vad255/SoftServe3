using System;
using System.Collections.Generic;
using System.Text;

using DAL.Stubs;

namespace DAL.Models
{
    public class Team
    {
        public int Id { get; private set; }

        public List<TeamMember> Members { get; set; }
    }
}
