using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL
{
    public class Review
    {
        public int Id { get; private set; }

        public DateTime Conducted { get; set; }

        public List<Story> CompletedOnTime { get; set; }
    }
}
