using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public enum FeatureState
    {
        PendingApproval = 1,
        ReadyToStart,
        InProgress,
        DevComplete,
        TestComplete,
        Accepted
    }
}
