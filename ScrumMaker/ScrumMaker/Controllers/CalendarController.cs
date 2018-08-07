using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using BL;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using ScrumMaker.Attributes;

namespace ScrumMaker.Controllers
{
    [Route("api/[controller]")]
    public class CalendarController : Controller
    {
        private IRepository<Calendar> _calendar;
        private IRepository<Meetings> _meetings;

        public CalendarController(IRepository<Calendar> calendar, IRepository<Meetings> meetings)
        {
            _calendar = calendar;
            _meetings = meetings;
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
        public IEnumerable<Calendar> GetThisCalendar(string date)
        {
            ClaimsIdentity identity = HttpContext.User?.Identity as ClaimsIdentity;
            string idFromClaims = identity.Claims.Where(c => c.Type == ClaimsKeys.ID).FirstOrDefault()?.Value;

            return _calendar.GetAll().Where(c => c.Date.Equals(DateTime.Parse(date))).Where(c => c.UserId == int.Parse(idFromClaims)).OrderBy(c => c.Hours);
        }

        [HttpGet("[action]")]
        public IEnumerable<Meetings> GetMeetings()
        {
            return _meetings.GetAll();
        }
    }
}