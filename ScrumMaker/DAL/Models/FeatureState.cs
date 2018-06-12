using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public enum FeatureState
    {
        PendingApproval = 0,
        ReadyToStart,
        InProgress,
        DevComplete,
        TestComplete,
        Accepted
    }
}
