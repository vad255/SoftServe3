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

namespace ScrumMaker.Controllers
{
    public class RetrospectiveController : Controller
    {
        private readonly IRepository<Sprint> _sprints;  

        public RetrospectiveController(IRepository<Sprint> sprints)
        {
            this._sprints = sprints;
        }

        [HttpPost]
        [Route("/SendEmail")]
        public void SendEmail(int sprintId, string toEmail)
        {
            var sprint = _sprints.GetById(sprintId);
            MailMessage emailMessage = new MailMessage("scrummaker325@gmail.com", "kyzyma77@gmail.com")
            {
                Subject = "Retrospective Meeting Result",
                Body = sprint.Retrospective
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