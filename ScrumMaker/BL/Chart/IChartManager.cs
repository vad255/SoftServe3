using DAL.Models;
using DAL.ModelsForCharts;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL.Chart
{
    public interface IChartManager
    {
        Sprint GetSprintByDate();
        List<DateTime> GetWorkingDaysOfSprint();
        ICollection<Story> GetStoriesOfSprint(Sprint sprint);
        ICollection<ScrumTask> GetTasksOfStories();
        ICollection<ModelForCharts> GetDataBurnDown();
        ICollection<ModelForCharts> GetDataVelocity();

    }
}
