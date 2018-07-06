using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public enum DefectState
    {
        Active,
        InWork,
        PendingTest,
        Fixed,
        NotaBug,
        Postponed
    }
}
