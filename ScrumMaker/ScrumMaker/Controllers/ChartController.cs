using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL.Chart;
using DAL.Access;
using DAL.Models;
using DAL.ModelsForCharts;
using Microsoft.AspNetCore.Mvc;

namespace ScrumMaker.Controllers
{
    public class ChartController : Controller
    {
        private IRepository<Sprint> _sprints;
        private IRepository<Story> _stories;
        private IChartManager _chartManager;

        public ChartController(IRepository<Sprint> repository, IRepository<Story> stories, IChartManager chartManager)
        {
            _sprints = repository;
            _stories = stories;
            _chartManager = chartManager; 
        }
        
        [Route("/getdata")]
        public ICollection<ModelForCharts> GetData()
        {
            ChartManager manager = new ChartManager(_sprints, _stories);
            return _chartManager.GetData();
        }
    }
}
