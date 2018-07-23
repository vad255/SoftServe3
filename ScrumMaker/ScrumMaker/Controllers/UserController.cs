
using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScrumMaker.Attributes;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ScrumMaker.Controllers
{
    public class UserController : Controller
    {
        private IRepository<Photo> _repository;
        private IRepository<User> _user;

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
                        var fileBytes = stream.ToArray();

                        Photo photo = _repository.GetAll().Where(p => p.UserId == GetUser().UserId).FirstOrDefault();
                        if (photo != null)
                        {
                            photo.UserPhoto = stream.ToArray();
                            _repository.Update(photo);
                        }

                        if (photo == null)
                        {
                            photo = new Photo() { UserPhoto = stream.ToArray(), UserId = GetUser().UserId };
                            _repository.Create(photo);

                            User u = GetUser();
                            u.Photo = photo;
                            _user.Update(u);
                        }

                        _repository.Save();
                    }
                }
            }
            return View();
        }

        [HttpGet]
        [Route("api/User/ShowPhoto")]
        public FileStreamResult ViewImage()
        {
            MemoryStream ms = null;
            try
            {
                Photo photo = _repository.GetAll().Where(u => u.UserId == GetUser().UserId).First();
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
            var photo = _repository.GetAll().Where(p => p.UserId == userId).FirstOrDefault();
            MemoryStream ms = null;
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
                User newUser = GetUser();
                newUser.Password = password;
                _user.Update(newUser);
                _user.Save();
                return true;
            }
            else
            {
                return false;
                throw new Exception();
            }
        }

        public string GetLogin()
        {
            var value = HttpContext.Request.Cookies["Authorization"];
            string login = null;
            if (value != null)
            {
                var handler = new JwtSecurityTokenHandler();
                var token = handler.ReadToken(value) as JwtSecurityToken;
                login = token.Claims.First(claim => claim.Type == "Login").Value;
            }
            return login;
        }

        private User GetUser()
        {
            User user = _user.GetAll().Where(u => u.Login.Equals(GetLogin())).FirstOrDefault();

            return user;
        }

        private static async Task<MemoryStream> GetDefaultAvatar()
        {
            byte[] fs = await System.IO.File.ReadAllBytesAsync(Path.GetFullPath("wwwroot/img/unknown.jpg"));
            return new MemoryStream(fs);
        }
    }
}