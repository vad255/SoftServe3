using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;


namespace UnitTestControllers
{
    [TestClass]
    public class StoriesControllerTest
    {
        [TestMethod]
        public void TestStoriesView()
        {
            var controller = new 
            var result = controller.Details(2) as ViewResult;
            Assert.AreEqual("Details", result.ViewName);
        }
    }
}
