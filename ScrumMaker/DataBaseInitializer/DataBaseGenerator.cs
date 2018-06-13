using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;
using DAL.Access;
using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace DataBaseInitializer
{
    public static class DataBaseGenerator
    {
        public static void FillDataBase( DbContext context, int quantity)
        {

            IRepository<User> db = new Repository<User>(context);
            IRepository<Story> db2 = new Repository<Story>(context);

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
            Random rand = new Random();
            if (quantity >= 0 && quantity < int.MaxValue)
            {
                for (int i = 0; i < quantity; i++)
                {
                    var user = new User() {
                        Login = "user " + i.ToString() + "@gmail.com",
                        Password = i.ToString(),
                        Activity = true,
                    Role =Role.User,
                };
                    db.Create(user);

                    var story = new Story()
                    {
                        Name = "story" + i.ToString(),
                        Description = "defualt description of stor",
                        Status = (StoryStatus)rand.Next(6),
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
