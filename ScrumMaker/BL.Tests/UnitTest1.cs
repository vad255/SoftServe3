using NUnit.Framework;
using BL;


namespace UnitTests
{
    [TestFixture]
    public class TestTesting
    {
        TestClass _itemToTesting;

        public TestTesting()
        {
            _itemToTesting = new TestClass();
        }


        [Test]
        public void TestMethod()
        {
            Assert.IsTrue(_itemToTesting.Return3() == 3);

        }
    }
}