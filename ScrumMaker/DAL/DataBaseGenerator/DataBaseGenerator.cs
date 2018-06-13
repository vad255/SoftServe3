using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;
using DAL.Access.IRepositoryImplementation;
using DAL.Access;

namespace DAL.DataBaseGenerator
{
    public static class DataBaseGenerator
    {
        // (DataContext context, int quantity)
        public static void FillDataBase(int quantity)
        {
            //context.Database.EnsureCreated();

            IRepository<User> db = new Repository<User>();
            IRepository<Story> db2 = new Repository<Story>();

            //if (quantity >= 0 && quantity < int.MaxValue)
            //{
            //    for (int i = 0; i < quantity; i++)
            //    {
            //        var user = new User() { Login = "user " + i.ToString() + "@gmail.com", Password = i.ToString() };
            //        context.Users.Add(user);

            //        var story = new Story()
            //        {
            //            Name = "user" + i.ToString(),
            //            Description = "defualt description of user",
            //            Status = StoryStatus.InProgress,
            //        };

            //        context.Stories.Add(story);
            //    }

            //    context.SaveChanges();
            //}

            if (quantity >= 0 && quantity < int.MaxValue)
            {
                for (int i = 0; i < quantity; i++)
                {
                    var user = new User() { Login = "user " + i.ToString() + "@gmail.com", Password = i.ToString() };
                    db.Create(user);

                    var story = new Story()
                    {
                        Name = "user" + i.ToString(),
                        Description = "defualt description of user",
                        Status = StoryStatus.InProgress,
                        Team = new Team()
                    };

                    db2.Create(story);
                }

                db.Save();
                db2.Save();
                
            }

            else
            {
                throw new Exception("quantity was out of range");
            }

        }

    }
}
