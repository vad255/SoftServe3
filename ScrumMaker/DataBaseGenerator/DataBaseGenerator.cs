using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseGenerator
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
                    var user = new User() { Email = "user " + i.ToString() + "@gmail.com", Password = i.ToString() };
                    context.Users.Add(user);
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
