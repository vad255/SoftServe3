using System;
using Microsoft.EntityFrameworkCore;
using DAL;


namespace DataBaseInitializer
{
    class Program
    {
        public const string connectionString =
            "Server=.\\SQLEXPRESS;Database=ScrumMaker;Trusted_Connection=True;MultipleActiveResultSets=true";

        static void Main(string[] args)
        {
            DbContextOptions options = new DbContextOptionsBuilder().UseSqlServer(connectionString).Options;

            DbContext context = new DataContext(options);

            DataBaseGenerator.FillDataBase(context);

            Console.WriteLine("DataBase is generated");
            Console.ReadKey();
        }
    }
}
