using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL.Interface
{
    public interface ISprintReviewManager
    {
        IEnumerable<SprintReview> Get();
        SprintReview GetById(int id);
        void Create(SprintReview sprintReview);
        void Update(SprintReview sprintReview);

    }
}
