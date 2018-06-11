using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public class DailyScrumInfo
    {
        public string Id { get; private set; }
        public string Description { get; set; }
        public DateTime Сonducted { get; set; }
    }
}
