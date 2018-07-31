using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using DAL.Stubs;


namespace DAL.Models
{
    public class Sprint
    {
        public int Id { get; private set; }

        [Required]
        public string Name { get; set; }

        public SprintStage Stage { get; set; }

        public int? HistoryId { get; set; }
        public virtual SprintStagesHistory History { get; set; }

        public virtual ICollection<Story> Backlog { get; set; }

        public virtual ICollection<Defect> Defects { get; set; }

        public virtual ICollection<DailyScrumInfo> DailyScrums { get; set; }

        public string Goal { get; set; }

        public string Retrospective { get; set; }

        [ForeignKey("Team")]
        public int? TeamId { get; set; }
        public virtual Team Team { get; set; }
    }
}