using BL.Interface;
using DAL.Access;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL
{
      public class DailyStandUpManager : IDailyStandUpManager
    {
        public IUnitOfWork _unit;

        public DailyStandUpManager(IUnitOfWork unit)
        {
            _unit = unit;
        }

        public void Create(DailyStandUp dailyStandUp)
        {
            _unit.DailyStandUps.Create(dailyStandUp);
            _unit.Commit();
        }

        public IEnumerable<DailyStandUp> Get()
        {
            return _unit.DailyStandUps.GetAll();
        }

        public DailyStandUp GetById(int id)
        {
            return _unit.DailyStandUps.GetById(id);
        }

        public void Update(DailyStandUp dailyStandUp)
        {
            _unit.DailyStandUps.Update(dailyStandUp);
            _unit.Commit();
        }
    }
}
