using BL.Interface;
using DAL.Access;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL
{
    public class SprintReviewManager : ISprintReviewManager
    {
        public IUnitOfWork _unit;

        public SprintReviewManager(IUnitOfWork unit)
        {
            _unit = unit;
        }

        public void Create(SprintReview sprintReview)
        {
            _unit.SprintReviews.Create(sprintReview);
            _unit.Commit();
        }

        public IEnumerable<SprintReview> Get()
        {
            return _unit.SprintReviews.GetAll();
        }

        public SprintReview GetById(int id)
        {
            return _unit.SprintReviews.GetById(id);
        }

        public void Update(SprintReview sprint)
        {
            _unit.SprintReviews.Update(sprint);
            _unit.Commit();
        }
    }
}
