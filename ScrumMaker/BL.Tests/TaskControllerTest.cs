using BL;
using ScrumMaker.Controllers;
using Moq;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;




namespace UnitTests
{
    [TestClass]
    public class TaskControllerTest
    {
        [TestMethod]
        public void GetTasks_ReturnsOk()
        {
            // arrange
            var mockRepository = new Mock<IRepository<ScrumTask>>();
            var controller = new TasksController(mockRepository.Object);

            // act
            var result = controller.Get();
            var okResult = result as OkObjectResult;

            // assert
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        //[TestMethod]
        //public void DeleteReturnsOk()
        //{
        //    // Arrange
        //    var mockRepository = new Mock<IRepository<ScrumTask>>();
        //    var controller = new TasksController(mockRepository.Object);

        //    // Act
        //    IActionResult actionResult = controller.Delete(24);
        //    var noContentResult = actionResult as NoContentResult;

        //    // Assert
        //    Assert.IsNotNull(noContentResult);
        //    Assert.AreEqual(204, noContentResult.StatusCode);
        //}

        [TestMethod]
        public void Post()
        {
            // Arrange
            var mockRepository = new Mock<IRepository<ScrumTask>>();
            var controller = new TasksController(mockRepository.Object);
            ScrumTask task = new ScrumTask
            {
                Summary = "SVN, Project Page",
                Story = null,
                Description = "Set-up SVN, project folders, SharePoint, project page",
                User = null, 
                Blocked = false,
                PlannedHours = 72,
                RemainingHours = 72,
                ActualHours = 0,
                Started = new DateTime(2018, 7, 6, 12, 45, 30),
                Completed = new DateTime(2018, 8, 8, 20, 45, 30),
                Type = TaskType.Analyses,
                State = TaskState.ToDo
            };

            // Act
            IActionResult actionResult = controller.Post(task);

            // Assert
            Assert.IsNotNull(actionResult);
            CreatedResult result = actionResult as CreatedResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(201, result.StatusCode);
        }

        //[TestMethod]
        //public void Patch()
        //{
        //   // Arrange
        //    var mockRepository = new Mock<IRepository<ScrumTask>>();
        //    var controller = new TasksController(mockRepository.Object);

        //    var delta = new Delta<ScrumTask>(typeof(ScrumTask));
        //    delta.TrySetPropertyValue(nameof(ScrumTask.TaskId), 4);
        //    delta.TrySetPropertyValue(nameof(ScrumTask.Summary), "Johanson");


        //    //act
        //    IActionResult actionResult = controller.Patch(1,  delta);

        //    //assert
            
            

        //}
    }
}
