using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ScrumMaker.Controllers
{
    public class RetrospectiveController : Controller
    {
        private readonly IRepository<RetrospectiveMeeting> _meetings;
        private readonly IRepository<RetrospectiveMessage> _messages;

        public RetrospectiveController(IRepository<RetrospectiveMeeting> meetings, IRepository<RetrospectiveMessage> messages)
        {
            this._meetings = meetings;
            this._messages = messages;
        }

        [HttpPost]
        [Route("/SendEmail")]
        public void SendEmail(int sprintId, string toEmail)
        {
            string body = GetRetrospectiveInfo(sprintId);

            MailMessage emailMessage = new MailMessage("scrummaker325@gmail.com", "prystaiko.roman@gmail.com")
            {
                Subject = "Retrospective Meeting Result",
                Body = body
            };

            SmtpClient smtp = new SmtpClient("smtp.sendgrid.net")
            {
                Port = 587,
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("azure_89e7c8ba6ee58b8f6bc781d3b71fbf50@azure.com", "1q3e5t7u"),
                DeliveryMethod = SmtpDeliveryMethod.Network
            };

            smtp.Send(emailMessage);
        }

        [HttpPost]
        [Route("api/SaveTxtFile")]
        public string DownLoadFile(int sprintId)
        {
            string body = GetRetrospectiveInfo(sprintId);
            return body;
        }

        private string GetRetrospectiveInfo(int sprintId)
        {
            var meeting = _meetings.GetAll().FirstOrDefault(m => m.SprintId == sprintId);
            var msgs = _messages.GetAll().Where(m => m.MeetingId == meeting.Id);
            string body = "";

            if (meeting != null)
            {
                foreach (var message in msgs)
                {
                    body += message.UserName + " (" +
                            message.SendingDate.ToShortDateString() + ") " +
                            "1) went well: " + message.WentWell + " " +
                            "2) improve to doing: " + message.CouldBeImproved + " " +
                            "3) commit to next sprint: " + message.CommitToDoing + Environment.NewLine;
                }
            }
            else
            {
                body = "You have not still done a retrospective meeting of the sprint with id: " + sprintId.ToString();
            }

            return body;
        }
    }
}