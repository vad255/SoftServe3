using System;

using Microsoft.EntityFrameworkCore;

using DAL;
using DAL.Access;

namespace DataBaseInitializer
{
    class Program
    {
        public const string CONNECTION_STRING =
            "Data Source=.\\SQLEXPRESS;Initial Catalog=ScrumMaker;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        static void Main(string[] args)
        {
            DbContextOptions options = new DbContextOptionsBuilder().UseSqlServer(CONNECTION_STRING).Options;


            DbContext context = new DataContext(options);

            DataBaseGenerator.FillDataBase(context);

            Console.WriteLine("DataBase is generated");
            Console.ReadKey();
        }
    }
}
