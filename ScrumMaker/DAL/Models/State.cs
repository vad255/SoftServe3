using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public enum State
    {
        Active,
        InWork,
        PendingTest,
        Fixed,
        NotaBug,
        Postponed
    }
}
