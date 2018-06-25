
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace ScrumMaker.Controllers
{
   
    public class UserEditController : Controller
    {
        private DataContext _dataContext;
        public UserEditController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        User user = new User();

        [HttpPost]
        [Route("api/User/EditPhoto")]
        public async Task<IActionResult> EditPhoto(List<IFormFile> file)
        {
            foreach(var i in file)
            {
                if (i.Length > 0)
                {
                    using (var stream = new MemoryStream())
                    {
                        await i.CopyToAsync(stream);
                        user.Photo = stream.ToArray();
                    }
                }
            }
            Console.WriteLine(user.Photo);
            return View();

        }

        [HttpPost]
        [Route("api/User/EditPassword")]
        public void EditPassword(string repeatpassword, string password)
        {
            if (password.Equals(repeatpassword))
            {
                //BL
                Console.WriteLine(password);
            }

        }

    }
}