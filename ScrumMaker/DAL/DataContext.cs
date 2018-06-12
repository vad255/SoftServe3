using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using DAL.Models;
using System.Threading.Tasks;

namespace DAL
{
    /// <summary>
    /// Main context.
    /// </summary>
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=ScrumMaker;Trusted_Connection=True;MultipleActiveResultSets=true");
        //}


        public DbSet<User> Users { get; set; }
        public DbSet<Story> Stories { get; set; }
        public DbSet<Feature> Features { get; set; }
    }
}
