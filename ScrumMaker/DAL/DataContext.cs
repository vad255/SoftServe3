using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Chatting;

namespace DAL
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Team> Teams { get; set; }

        public DbSet<Story> Stories { get; set; }

        public DbSet<Defect> Defects { get; set; }

        public DbSet<ScrumTask> Tasks { get; set; }

        public DbSet<Sprint> Sprints { get; set; }

        public DbSet<Feature> Features { get; set; }

        public DbSet<Message> ChatMessages { get; set; }

        public DbSet<ChatRoom> ChatingRooms { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<SprintReview> SprintReviews { get; set; }

        public DbSet<Meetings> Meetings { get; set; }

        public DbSet<Calendar> Calendars { get; set; }

        public DbSet<RetrospectiveMeeting> RetrospectiveMeetings { get; set; }

        public DbSet<RetrospectiveMessage> RetrospectiveMessages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Role>().HasIndex(x => x.Name).IsUnique();
            modelBuilder.Entity<User>().HasIndex(u => u.Login).IsUnique();
            modelBuilder.Entity<Story>().HasOne(story => story.Feature).WithMany(feature => feature.Stories);
            modelBuilder.Entity<Feature>().HasMany(feature => feature.Stories).WithOne(story => story.Feature).OnDelete(DeleteBehavior.SetNull);
            //I will add Team in future
            //modelBuilder.Entity<User>().HasOne(u => u.Team);
            //modelBuilder.Entity<Team>().HasMany(t => t.Members).WithOne(u => u.Team);
        }
    }
}
