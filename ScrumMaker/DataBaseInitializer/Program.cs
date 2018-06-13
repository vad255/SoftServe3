using System;

using Microsoft.EntityFrameworkCore;

using DAL;
using DAL.Access;

namespace DataBaseInitializer
{
    class Program
    {
        public const string CONNECTION_STRING =
            "Server=.\\SQLEXPRESS;Database=ScrumMaker;Trusted_Connection=True;MultipleActiveResultSets=true";

        static void Main(string[] args)
        {
            DbContextOptions options = new DbContextOptionsBuilder().UseSqlServer(CONNECTION_STRING).Options;


            DbContext context = new DataContext(options);

            DataBaseGenerator.FillDataBase(context, 100);

        }
    }
}
