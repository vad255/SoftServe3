using DAL.Access;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using DAL.ModelsForCharts;

namespace BL.Chart
{
    public class ChartManager:IChartManager
    {
        private IRepository<Sprint> _sprints;
        private IRepository<Story> _stories;
        private Sprint _currentSprint;
        public ChartManager(IRepository<Sprint> repository, IRepository<Story> stories)
        {
            _sprints = repository;
            _stories = stories;
        }
        public Sprint GetSprintByDate()
        {
            return _sprints.GetAll().Include(x => x.History).Include(x => x.Backlog).FirstOrDefault(x => x.History.Begined < DateTime.Now && x.History.Ended > DateTime.Now); ;
        }
        public IQueryable<Sprint> GetSprintForVelocity()
        {
            return _sprints.GetAll().Include(x => x.History).Include(x => x.Backlog).Where(x => x.History.Ended < DateTime.Now);
        }
        public List<DateTime> GetWorkingDaysOfSprint()
        {
            List<DateTime> result = new List<DateTime>();
            Sprint sprint = GetSprintByDate();
            DateTime start = sprint.History.Begined.Value;
            int days = (sprint.History.Ended.Value - start).Days + 1;
            while (start<=sprint.History.Ended.Value) {
                if (start.DayOfWeek==DayOfWeek.Sunday||
                    start.DayOfWeek==DayOfWeek.Saturday)
                {
                    --days;
                }
                else
                {
                    result.Add(start);
                }
                start = start.Date.AddDays(1);
            }
            return result;
        }
        public ICollection<Story> GetStoriesOfSprint(Sprint sprint)
        {
            ICollection<Story> result = new List<Story>();
            ICollection<Story> stories = _stories.GetAll().Include(x => x.Tasks).ToList();
            foreach(Story story in sprint.Backlog)
            {
                result.Add(stories.SingleOrDefault(x => x.Id == story.Id));
            }
            return result;
        }
        public ICollection<ScrumTask> GetTasksOfStories()
        {
            ICollection<ScrumTask> tasks = new List<ScrumTask>();
            ICollection<Story> stories = GetStoriesOfSprint(GetSprintByDate());
            foreach(Story story in stories)
            {
                foreach (ScrumTask task in story.Tasks)
                    tasks.Add(task);
            }
            return tasks;
        }
        public ICollection<ModelForCharts> GetDataBurnDown()
        {
            ICollection<ModelForCharts> result = new List<ModelForCharts>();
            List<DateTime> listOfDate = GetWorkingDaysOfSprint();
            ICollection<ScrumTask> tasks = GetTasksOfStories();
            int remainingTasks = tasks.Count;
            for (int i = 1; i <= listOfDate.Count; i++)
            {
                int completedTask = tasks.Where(x => x.Completed != null && x.Completed.Value.DayOfYear == listOfDate[i - 1].DayOfYear).Count();
                remainingTasks -= completedTask;
                result.Add(new ModelForCharts { Name = "Day "+ i, RemainingTask = remainingTasks, CompletedTask = completedTask});
            }
            return result;
        }

        public ICollection<ModelForCharts> GetDataVelocity()
        {
            ICollection<ModelForCharts> result = new List<ModelForCharts>();
            foreach(Sprint sprint in GetSprintForVelocity())
            {
                int remainingTasks = 0;
                int completedTasks = 0;
                foreach(Story story in GetStoriesOfSprint(sprint))
                {
                    remainingTasks += story.Tasks.Count();
                    completedTasks += story.Tasks.Where(x => x.Completed != null && x.Completed.Value.DayOfYear <= sprint.History.Ended.Value.DayOfYear).Count();
                }
                result.Add(new ModelForCharts() { Name = sprint.Name, CompletedTask = completedTasks, RemainingTask = remainingTasks });
            }
            return result;
        }

    }
}
