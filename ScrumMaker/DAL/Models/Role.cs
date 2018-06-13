using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Role
    {
        private Role(int roleId, string name)
        {
            RoleId = roleId;
            Name = name;
        }
        public int RoleId { get; set; }
        public string Name { get; private set; }

        public override string ToString()
        {
            return Name;
        }

        private static Role _user = new Role(1, "User");
        private static Role _admin = new Role(2, "Admin");
        private static Role _developer = new Role(3, "Developer");
        private static Role _productOwner = new Role(4, "ProductOwner");
        private static Role _scrumMaser = new Role(5, "ScrumMaster");

        public static Role User { get { return _user; } }
        public static Role Admin { get { return _admin; } }
        public static Role Developer { get { return _developer; } }
        public static Role Owner { get { return _scrumMaser; } }
        public static Role ScrumMaster { get { return _scrumMaser; } }

    }
}
