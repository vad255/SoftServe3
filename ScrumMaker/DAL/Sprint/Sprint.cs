using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using DAL.Stubs;

namespace DAL
{
    public class Sprint
    {
        public int Id { get; private set; }

        public List<Story> Stories { get; set; }
        public List<DailyScrumInfo> DailyScrums { get; set; }

        public Team Team { get; set; }
        public SprintStage Stage { get; set; }
    }
}
