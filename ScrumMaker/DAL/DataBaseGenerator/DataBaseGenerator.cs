using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.DataBaseGenerator
{
    public static class DataBaseGenerator
    {
        public static void FillDataBase(DataContext context, int quantity)
        {
            context.Database.EnsureCreated();


            if (quantity >= 0 && quantity < int.MaxValue)
            {
                for (int i = 0; i < quantity; i++)
                {
                    var user = new User() { Login = "user " + i.ToString() + "@gmail.com", Password = i.ToString() };
                    context.Users.Add(user);

                    var story = new Story()
                    {
                        Name = "user" + i.ToString(),
                        Description = "defualt description of user",
                        Status = StoryStatus.InProgress,
                    };

                    context.Stories.Add(story);
                }

                context.SaveChanges();
            }
            else
            {
                throw new Exception("quantity was out of range");
            }

        }

    }
}
