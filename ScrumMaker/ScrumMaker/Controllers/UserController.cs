﻿using System;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using BL.CryptoServiceProvider;
using System.Security;
using System.Net.Mime;
using ScrumMaker.Attributes;
using System.Security.Cryptography;

namespace ScrumMaker.Controllers
{
    //[CookieAuthorize]
    //[RefreshToken]
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

                        Photo photo = _repository.GetAll().FirstOrDefault(x => x.UserId == HttpContext.User.UserId());
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
                Photo photo = _repository.GetAll().FirstOrDefault(x => x.UserId == HttpContext.User.UserId());
                if (photo != null)
                    ms = new MemoryStream(photo.UserPhoto);
            }
            catch
            {
                ms = GetDefaultAvatar().Result;
            }

            return new FileStreamResult(ms, "image/jpeg");
        }

        [HttpGet]
        [Route("api/User/ViewImageByLoign")]
        public FileStreamResult ViewImageByLoign(string login)
        {
            MemoryStream ms = null;
            try
            {
                User user = _user.GetAll().Where(u => u.Login.Equals(login)).First();
                Photo photo = _repository.GetAll().Where(p => p.UserId == user.UserId).First();
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
            var photo = _repository.GetAll().FirstOrDefault(x => userId == 0 ? x.UserId == HttpContext.User.UserId() : x.UserId == userId);
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
                var hash = PasswordStorage.CreateHash(password);
                newUser.Password = hash;
                _user.Update(newUser);
                _user.Save();
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpPost]
        [Route("/ResetUserPassword")]
        public bool ResetPassword(string login)
        {
            var user = _user.GetAll().FirstOrDefault(u => u.Email == login);

            if (user != null)
            {
                var password = GetRandomPassword();

                user.Password = PasswordStorage.CreateHash(password);
                _user.Update(user);
                _user.Save();

                MailMessage emailMessage = new MailMessage("ScrumMaker@support.com", login)
                {
                    Subject = "Reset Password",
                };

                var body = GetBody(password);

                AlternateView htmlView = AlternateView.CreateAlternateViewFromString(body, null, "text/html");

                LinkedResource theEmailImage = new LinkedResource("./wwwroot/img/NewLogo.png", MediaTypeNames.Image.Jpeg);
                theEmailImage.ContentId = "NewLogo";
                htmlView.LinkedResources.Add(theEmailImage);
                emailMessage.AlternateViews.Add(htmlView);

                SmtpClient smtp = new SmtpClient("smtp.sendgrid.net")
                {
                    Port = Convert.ToInt32(587),
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential("prystaiko.roman", "1q3e5t7u9o"),
                    DeliveryMethod = SmtpDeliveryMethod.Network
                };
                emailMessage.IsBodyHtml = true;

                smtp.Send(emailMessage);


                return true;
            }
            else
            {
                return false;
            }

        }

        private string GetBody(string password)
        {
            var body = "<img src=\"cid:NewLogo\" /><h2 color=\"green\">The ScrumMaker Team</h2>\n" +
                       string.Format("<h3>Your new password is: <b>{0}</b></h3>", password);
            return body;
        }

        private string GetRandomPassword()
        {
            RNGCryptoServiceProvider cryptRNG = new RNGCryptoServiceProvider();
            byte[] tokenBuffer = new byte[8];
            cryptRNG.GetBytes(tokenBuffer);
            return Convert.ToBase64String(tokenBuffer);
        }

        private static async Task<MemoryStream> GetDefaultAvatar()
        {
            var fs = await System.IO.File.ReadAllBytesAsync(Path.GetFullPath("wwwroot/img/unknown.jpg"));
            return new MemoryStream(fs);
        }
    }
}