using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Role
    {
        private Role(string name)
        {
            Name = name;
        }
        public int RoleId { get; set; }
        public string Name { get; private set; }



        private static Role _user = new Role("User");
        private static Role _admin = new Role("Admin");
        private static Role _scrumMaser = new Role("ScrumMaster");

        public static Role User { get { return _user; } }
        public static Role Admin { get { return _admin; } } 
        public static Role Owner { get { return _scrumMaser; } }

    }
}
