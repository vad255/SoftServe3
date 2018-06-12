using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL
{
    public class Role
    {
        public Role(string name)
        {
            Name = name;
        }
        public int RoleId { get; set; }
        public string Name { get; private set; }
        public static string User { get; } = "User";
        public static string Admin { get; } = "Admin";
        public static string Owner { get; } = "Owner";

    }
}
