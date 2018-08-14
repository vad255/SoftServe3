using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL.Interface
{
     public interface IDailyStandUpManager
    {
        IEnumerable<DailyStandUp> Get();
        DailyStandUp GetById(int id);
        void Create(DailyStandUp dailyStandUp);
        void Update(DailyStandUp dailyStandUp);
    }
}
