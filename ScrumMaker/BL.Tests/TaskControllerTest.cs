using BL;
using ScrumMaker.Controllers;
using Moq;
using DAL.Access;
using DAL.Models;
using Microsoft.AspNet.OData.Results;
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
        //[TestMethod]
        //public void GetTasks_ReturnsOk()
        //{
        //    // arrange
        //    var mockRepository = new Mock<IRepository<ScrumTask>>();
        //    var controller = new TasksController(mockRepository.Object);

        //    // act
        //    var result = controller.Get();
        //    var okResult = result as OkObjectResult;

        //    // assert
        //    Assert.IsNotNull(okResult);
        //    Assert.AreEqual(200, okResult.StatusCode);
        //}

        //[TestMethod]
        //public void DeleteTasks_ReturnsBool()
        //{
        //    // Arrange
        //    var mockRepository = new Mock<IRepository<ScrumTask>>();
        //    var controller = new TasksController(mockRepository.Object);

        //    // Act
        //    var boolResult = controller.Delete(24);

        //    // Assert
        //    Assert.IsNotNull(boolResult);
        //    Assert.AreEqual(true, boolResult);
        //}

        //[TestMethod]
        //public void PostTasks_ReturnsCreatedODataResult()
        //{
        //    // Arrange
        //    var mockRepository = new Mock<IRepository<ScrumTask>>();
        //    var controller = new TasksController(mockRepository.Object);
        //    ScrumTask task = new ScrumTask
        //    {
        //        ActualHours = 0,
        //        Blocked = false,
        //        Completed = null,
        //        Description = "Set-up SVN, project folders, SharePoint, project page",
        //        PlannedHours = 72,
        //        RemainingHours = 72,
        //        Started = null,
        //        State = TaskState.ToDo,
        //        Story = null,
        //        StoryId = 1,
        //        Summary = "SVN, Project Page",
        //        TaskId = 111,
        //        Type = TaskType.Analyses,
        //        User = null,
        //        UserId = 1
        //    };

        //    // Act
        //    var actionResult = controller.Post(task);
        //    //Assert.IsNotNull(actionResult);
        //    //CreatedODataResult<ScrumTask> result = actionResult as CreatedODataResult<ScrumTask>;

        //    // Assert
        //    Assert.IsNotNull(actionResult);
        //    Assert.IsInstanceOfType(actionResult, typeof(CreatedODataResult<ScrumTask>));
        //}

        [TestMethod]
        public void PatchTasks_ReturnsUpdatedODataResult()
        {
            // Arrange
            var mockRepository = new Mock<IRepository<ScrumTask>>();
            var controller = new TasksController(mockRepository.Object);

            var delta = new Delta<ScrumTask>(typeof(ScrumTask));
            //delta.TrySetPropertyValue(nameof(ScrumTask.TaskId), 4);
            //delta.TrySetPropertyValue(nameof(ScrumTask.Summary), "Johanson");


            //act
            var actionResult = controller.Patch(4, delta);
            Assert.IsNotNull(actionResult);

            var updatedResult = actionResult as UpdatedODataResult<ScrumTask>;
            Assert.IsNotNull(updatedResult);
            //delta.TrySetPropertyValue(nameof(ScrumTask.TaskId), 4);
            //delta.TrySetPropertyValue(nameof(ScrumTask.Summary), "Johanson");
            //assert
            //Assert.IsInstanceOfType(actionResult, typeof(UpdatedODataResult<ScrumTask>));

        }
        }
    }
