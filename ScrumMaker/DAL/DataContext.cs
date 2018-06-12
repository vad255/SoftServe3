using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<User>().ToTable("Users");
        //    modelBuilder.Entity<Story>().ToTable("Stories");

        //}


        public DbSet<User> Users { get; set; }

        public DbSet<Story> Stories { get; set; }

        public DbSet<Defect> Defects { get; set; }
    }
}
