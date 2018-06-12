using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using DAL.Stubs;


namespace DAL.Models
{
    public class Sprint
    {
        public int Id { get; private set; }


        public SprintStage Stage { get; set; }

        public SprintStagesHistory History { get; set; }

        public ICollection<Story> Backlog { get; set; }

        public ICollection<Defect> Defects { get; set; }


        public ICollection<DailyScrumInfo> DailyScrums { get; set; }


        public string Review { get; set; }


        public string Retrospective { get; set; }


        public Team Team { get; set; }
    }
}
