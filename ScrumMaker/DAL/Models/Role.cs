using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Role
    {
        public int RoleId { get; set; }
        public string Name { get; set; }
    }
}
