using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public enum SprintStage
    {
        Planning = 1,
        Progress = 2,
        Review = 3,
        Retrospective = 4,
        Finished = 5
    }
}
