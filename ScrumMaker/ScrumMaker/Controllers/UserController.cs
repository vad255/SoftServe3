using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ScrumMaker.Controllers
{
    public class UserController : Controller
    {
        private readonly IRepository<Photo> _repository;
        private readonly IRepository<User> _user;

        public UserController(IRepository<Photo> repository, IRepository<User> user)
        {
            _user = user;
            _repository = repository;
        }

        [HttpPost]
        [Route("api/User/EditPhoto")]
        public async Task<IActionResult> EditPhoto(List<IFormFile> file)
        {
            foreach (var i in file)
            {
                if (i.Length > 0)
                {
                    using (var stream = new MemoryStream())
                    {
                        await i.CopyToAsync(stream);

                        Photo photo = _repository.GetAll().FirstOrDefault(x=>x.UserId==HttpContext.User.UserId());
                        if (photo != null)
                        {
                            photo.UserPhoto = stream.ToArray();
                            _repository.Update(photo);
                        }

                        if (photo == null)
                        {
                            photo = new Photo() { UserPhoto = stream.ToArray(), UserId = HttpContext.User.UserId() };
                            _repository.Create(photo);

                            User u = _user.GetById(HttpContext.User.UserId());
                            u.Photo = photo;
                            _user.Update(u);
                        }

                        _repository.Save();
                    }
                }
            }
            return Redirect("/");
        }

        [HttpGet]
        [Route("api/User/ShowPhoto")]
        public FileStreamResult ViewImage()
        {
            MemoryStream ms = new MemoryStream();
            try
            {
                Photo photo = _repository.GetAll().FirstOrDefault(x=>x.UserId==HttpContext.User.UserId());
                if(photo != null)
                ms = new MemoryStream(photo.UserPhoto);
            }
            catch
            {
                ms = GetDefaultAvatar().Result;
            }

            return new FileStreamResult(ms, "image/jpeg");
        }



        [HttpGet]
        [Route("api/UserPhoto/{userId?}")]
        public async Task<FileStreamResult> GetAvatar(int userId)
        {
            var photo = _repository.GetAll().FirstOrDefault(x=>x.UserId==HttpContext.User.UserId());
            MemoryStream ms;
            if (photo != null)
                ms = new MemoryStream(photo.UserPhoto);
            else
                ms = await GetDefaultAvatar();

            return new FileStreamResult(ms, "image/jpeg");
        }

        [HttpPost]
        [Route("api/User/EditPassword")]
        public bool EditPassword(string repeatpassword, string password)
        {
            if (password.Equals(repeatpassword))
            {
                User newUser = _user.GetById(HttpContext.User.UserId());
                newUser.Password = password;
                _user.Update(newUser);
                _user.Save();
                return true;
            }
            else
            {
                return false;
            }
        }

        private static async Task<MemoryStream> GetDefaultAvatar()
        {
            var fs = await System.IO.File.ReadAllBytesAsync(Path.GetFullPath("wwwroot/img/unknown.jpg"));
            return new MemoryStream(fs);
        }
    }
}