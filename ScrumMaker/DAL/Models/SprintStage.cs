using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public enum SprintStage
    {
        Planning,
        Progress,
        Review,
        Retrospective,
        Finished
    }
}
