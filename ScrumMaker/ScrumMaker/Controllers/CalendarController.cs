using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Security.Claims;
using BL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using ScrumMaker.Attributes;

namespace ScrumMaker.Controllers
{
    [RefreshToken]
    [CookieAuthorize]
    [Route("api/[controller]")]
    public class CalendarController : Controller
    {
        private IRepository<Calendar> _calendar;
        private IRepository<Meetings> _meetings;
        private IRepository<User> _user;

        public CalendarController(IRepository<Calendar> calendar, IRepository<Meetings> meetings, IRepository<User> user)
        {
            _calendar = calendar;
            _meetings = meetings;
            _user = user;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("[action]")]
        public IEnumerable<Calendar> CreateNewEvent(int hours, int meeting, string date)
        {
            ClaimsIdentity identity = HttpContext.User?.Identity as ClaimsIdentity;
            string idFromClaims = identity.Claims.Where(c => c.Type == ClaimsKeys.ID).FirstOrDefault()?.Value;

            if (_calendar.GetAll().Where(c => c.Date.Equals(DateTime.Parse(date))).Where(c => c.Hours == hours).Where(c => c.UserId == int.Parse(idFromClaims)).SingleOrDefault() == null)
            {
                _calendar.Create(new Calendar() { MeetingId = meeting, Hours = hours, Date = DateTime.Parse(date), UserId = int.Parse(idFromClaims) });
                _calendar.Save();

                return _calendar.GetAll().Where(c => c.Date.Equals(DateTime.Parse(date))).Where(c => c.UserId == int.Parse(idFromClaims)).OrderBy(c => c.Hours);
            }
            else
            {
                return new List<Calendar>();
            }
        }

        [HttpPost("[action]")]
        public IEnumerable<Calendar> CreateNewEventFotAllTeam(int hours, int meeting, string date)
        {
            ClaimsIdentity identity = HttpContext.User?.Identity as ClaimsIdentity;
            string idFromClaims = identity.Claims.Where(c => c.Type == ClaimsKeys.ID).FirstOrDefault()?.Value;


            User user = _user.GetById(int.Parse(idFromClaims));
            List<User> users = _user.GetAll().Where(u => u.TeamId == user.TeamId).ToList();
            foreach(var i in users)
            {
                if (_calendar.GetAll().Where(c => c.Date.Equals(DateTime.Parse(date))).Where(c => c.Hours == hours).Where(c => c.UserId == i.UserId).SingleOrDefault() == null)
                {
                    _calendar.Create(new Calendar() { MeetingId = meeting, Hours = hours, Date = DateTime.Parse(date), UserId = i.UserId });
                }
                else
                {

                    var fromAddress = new MailAddress("scrummaker325@gmail.com", "Administration");
                    var toAddress = new MailAddress(user.Email, user.Login);
                    const string fromPassword = "Qwerty!123";
                    const string subject = "Few Meetings";
                    const string body = "You have a few meetings in one day.";

                    SmtpClient smtp = new SmtpClient("smtp.sendgrid.net")
                    {
                        Port = Convert.ToInt32(587),
                        EnableSsl = true,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential("azure_0155d864f6f31073768f8d1d204f5397@azure.com", "1q3e5t7u"),
                        DeliveryMethod = SmtpDeliveryMethod.Network
                    };
                    using (var message = new MailMessage(fromAddress, toAddress)
                    {
                        Subject = subject,
                        Body = body
                    })
                    {
                        smtp.Send(message);
                    }

                    _calendar.Create(new Calendar() { MeetingId = meeting, Hours = hours, Date = DateTime.Parse(date), UserId = i.UserId });
                }
            }
            _calendar.Save();

            return _calendar.GetAll().Where(c => c.Date.Equals(DateTime.Parse(date))).Where(c => c.UserId == user.UserId).OrderBy(c => c.Hours);
        }

        [HttpPost("[action]")]
        public IEnumerable<Calendar> GetThisCalendar(string date)
        {
            ClaimsIdentity identity = HttpContext.User?.Identity as ClaimsIdentity;
            string idFromClaims = identity.Claims.Where(c => c.Type == ClaimsKeys.ID).FirstOrDefault()?.Value;
            User user = _user.GetById(int.Parse(idFromClaims));

            return _calendar.GetAll().Where(c => c.Date.Equals(DateTime.Parse(date))).Where(c => c.UserId == user.UserId).ToList().OrderBy(c => c.Hours);
        }

        [HttpGet("[action]")]
        public IEnumerable<Meetings> GetMeetings()
        {
            return _meetings.GetAll();
        }
    }
}