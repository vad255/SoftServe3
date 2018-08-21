
using System;
using Microsoft.EntityFrameworkCore;
using DAL;


namespace DataBaseInitializer
{
    class Program
    {
        public const string connectionString =

            "Server=tcp:scrummaker2.database.windows.net,1433;Initial Catalog=ScrumMaker2db;Persist Security Info=False;User ID=ScrumUser;Password=1q3e5t7U;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

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
