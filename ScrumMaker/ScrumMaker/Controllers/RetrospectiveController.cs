using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp;

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
            var meeting = _meetings.GetAll().FirstOrDefault(m => m.SprintId == sprintId);
            var msgs = _messages.GetAll().Where(m => m.MeetingId == meeting.Id);
            string body = "";

            if (meeting != null)
            {
                foreach (var message in msgs)
                {
                    body += message.UserName + " (" +
                            message.SendingDate.ToShortDateString() + ") " +
                            "went well: " + message.WentWell + " " +
                            "improve to doing: " + message.CouldBeImproved + " " +
                            "commit to next sprint: " + message.CommitToDoing + Environment.NewLine;
                }
            }
            else
            {
                body = "You have not still done a retrospective meeting of the sprint with id: " + sprintId.ToString();
            }

            MailMessage emailMessage = new MailMessage("scrummaker325@gmail.com", "prystaiko.roman@gmail.com")
            {
                Subject = "Retrospective Meeting Result",
                Body = body
            };

            SmtpClient smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("scrummaker325@gmail.com", "Qwerty!123"),
                DeliveryMethod = SmtpDeliveryMethod.Network
            };

            smtp.Send(emailMessage);
        }


        //[Route("/SaveTxtFile")]
        //public async IActionResult SaveTxtFile()
        //{
        //HttpResponse response = System.Web.HttpContext.Current.Response;
        //HttpResponse resp = System.Web.HttpContext.Current.Response;
        //string filename = "thisfilename.txt";
        //string destFolder = @"D:\NET\MvcApplication2\MvcApplication2\temp";
        //string filePath = Path.Combine(destFolder, filename);
        //using (StreamWriter writer = new StreamWriter(filePath))
        //{
        //    writer.Write("Word ");
        //    writer.WriteLine("word 2");
        //    writer.WriteLine("Line");
        //    writer.Flush();
        //    writer.Close();
        //}

        //resp.ContentType = "application/text";
        //resp.AppendHeader("content-disposition", "attachment; filename=" + "thisfilename.txt");
        //response.WriteFile(filePath);
        //response.Flush();
        //response.End();
        //return View();
        // }
    }
}