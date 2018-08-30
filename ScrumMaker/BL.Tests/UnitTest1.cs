using System.Net.Http;
using NUnit.Framework;
using BL;
using ScrumMaker.Controllers;
using Microsoft.AspNetCore.Mvc;
using DAL;
using DAL.Access;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Results;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Assert = NUnit.Framework.Assert;
using Moq;
using System.CodeDom;

namespace BL.Tests
{
    //[TestFixture]
    //public class TestTesting
    //{
    //    const string connectionString =
    //          "Server=.\\SQLEXPRESS;Database=ScrumMaker;Trusted_Connection=True;MultipleActiveResultSets=true";

    //    static DbContextOptions options = new DbContextOptionsBuilder().UseSqlServer(connectionString).Options;
    //    //static DbContext cont = new DbContext(options);

    //    static DataContext context = new DataContext(options);

    //    //static var uow = new Mock<IUnitOfWork(cont)>;
    //    //static IStoriesManager _manager = new StoriesManager(uow);
    //    //static IRepository<Story> _stories = new Repository<Story>(cont);
    //    private readonly Mock<IStoriesManager> _manager = new Mock<IStoriesManager>();
    //    private readonly Mock<IRepository<Story>> _stories = new Mock<IRepository<Story>>();

    //    [Test]
    //    public void TestStoriesView()
    //    {
    //        _stories.Setup(m => m.GetAll()).Returns(new[] {
    //            new Story (),
    //            new Story(),
    //            new Story (),
    //            new Story ()
    //        }.AsQueryable());

    //        var controller = new StoriesController(context, _manager.Object, _stories.Object);
    //        var response = controller.Get();
            
     
    //        Assert.AreEqual(new OkObjectResult(_stories.Object.GetAll()), response as OkObjectResult);
    //    }

    //    [Test]
    //    public void TestAddNewStoryEntity()
    //    {
    //        Story story = new Story()
    //        {
    //            Name = "TestStory",
    //            Description = "TestDescription",
    //            SprintId = 1,
    //            FeatureId = 2,
    //            TeamId = 3,
    //            UserId = 4,
    //            Status = StoryStatus.PendingApproval,
    //            Defects = new List<Defect>(),
    //            Tasks = new List<ScrumTask>()
    //        };

    //        var controller = new StoriesController(context, _manager.Object, _stories.Object);
    //        var response = controller.Post(story);

    //        CreatedODataResult<Story> result = new CreatedODataResult<Story>(story);
    //        var res = response as CreatedODataResult<Story>;
    //        Assert.AreEqual(result, res);
    //    }

    //    [Test]
    //    public void TestDeleteStoryEntityById()
    //    {
    //        var controller = new StoriesController(context, _manager.Object, _stories.Object);
    //        var response = controller.Delete(14);
    //        Assert.AreEqual(false, response);
    //        var response2 = controller.Delete(130000);
    //        Assert.AreEqual(true, response2);
    //    }

    //    [Test]
    //    public void TestUpdateStoryEntity()
    //    {
    //        Story story = new Story()
    //        {
    //            Name = "TestStory",
    //            Description = "TestDescription",
    //            SprintId = 1,
    //            FeatureId = 2,
    //            TeamId = 3,
    //            UserId = 4,
    //            Status = StoryStatus.PendingApproval,
    //            Defects = new List<Defect>(),
    //            Tasks = new List<ScrumTask>()
    //        };

    //        Delta<Story> delta = new Delta<Story>();

    //        var controller = new StoriesController(context, _manager.Object, _stories.Object);
    //        var response = controller.Patch(12, delta);
    //        UpdatedODataResult<Story> result = new UpdatedODataResult<Story>(story);

    //        Assert.AreEqual(result, response as UpdatedODataResult<Story>);
    //    }
    //}
}