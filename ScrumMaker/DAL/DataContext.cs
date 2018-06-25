using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;

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
        
        public DbSet<Role> Roles { get; set; } 
        
        public DbSet<Team> Teams { get; set; }
        
        public DbSet<Story> Stories { get; set; }

        public DbSet<Defect> Defects { get; set; }

        public DbSet<ScrumTask> Tasks { get; set; }

        public DbSet<Sprint> Sprints { get; set; }

        public DbSet<Feature> Features { get; set; }

        
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasIndex(x => x.Name).IsUnique();
            //modelBuilder.Entity<User>().HasOne(u => u.Team);
            //modelBuilder.Entity<Team>().HasMany(t => t.Members).WithOne(u => u.Team);

        }
    }
}
