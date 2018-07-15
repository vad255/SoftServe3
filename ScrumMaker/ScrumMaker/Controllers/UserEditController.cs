
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
    public class UserEditController : Controller
    {
        private IRepository<Photo> _repository;
        private IRepository<User> _user;

        public UserEditController(IRepository<Photo> repository, IRepository<User> user)
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
                FileStream file = System.IO.File.OpenRead(Path.GetFullPath("wwwroot/img/unknown.jpg"));
                ms = new MemoryStream();
                file.CopyTo(ms);
                ms.Position = 0;
            }

            return new FileStreamResult(ms, "image/jpeg");
        }

        [HttpPost]
        [Route("api/User/EditPassword")]
        public void EditPassword(string repeatpassword, string password)
        {
            if (password.Equals(repeatpassword))
            {
                User newUser = GetUser();
                newUser.Password = password;
                _user.Update(newUser);
                _user.Save();
            }
            else
            {
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
    }
}