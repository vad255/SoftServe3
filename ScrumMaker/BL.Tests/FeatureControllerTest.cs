using DAL.Access;
using DAL.Models;
using Microsoft.AspNet.OData.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using ScrumMaker.Controllers;
using System;
using System.Collections.Generic;
using System.Text;

namespace BL.Tests
{
    [TestClass]
    public class FeatureControllerTest
    {
        [TestMethod]
        public void GetFeatures_ReturnsOkObjectResult()
        {
            // arrange
            var mockManager = new Mock<IFeaturesManager>();
            var controller = new FeatureController(mockManager.Object);

            // act
            var result = controller.Get();
            var okResult = result as OkObjectResult;

            // assert
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [TestMethod]
        public void GetFeatureById_ReturnsOkObjectResult()
        {
            // arrange
            var mockManager = new Mock<IFeaturesManager>();
            var controller = new FeatureController(mockManager.Object);
            var featureId = 5;

            // act
            var result = controller.GetById(featureId);
            var okResult = result as OkObjectResult;

            // assert
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [TestMethod]
        public void DeleteFeature_ReturnsBoolean()
        {
            // Arrange
            var mockManager = new Mock<IFeaturesManager>();
            var controller = new FeatureController(mockManager.Object);
            var featureId = 5;

            // Act
            var boolResult = controller.Delete(featureId);

            // Assert
            Assert.IsNotNull(boolResult);
            Assert.AreEqual(true, boolResult);
        }

        [TestMethod]
        public void Feature_ReturnsCreatedFeature()
        {
            // Arrange
            var mockManager = new Mock<IFeaturesManager>();
            var controller = new FeatureController(mockManager.Object);
            var featureName = "Test feature";
            var featureDescription = "Test of creating feature.";
            var isBlocked = true;
            var state = FeatureState.Accepted;
            var feature = new Feature()
            {
                FeatureName = featureName,
                Description = featureDescription,
                Blocked = isBlocked,
                State = state
            };

            // Act
            var result = controller.Post(feature);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(CreatedODataResult<Feature>));
            var createdFeature = result as CreatedODataResult<Feature>;
            //Assert.Equals(featureName, createdFeature.FeatureName);
            //Assert.Equals(featureDescription, createdFeature.Description);
            //Assert.Equals(isBlocked, createdFeature.Blocked);
            //Assert.Equals(state, createdFeature.State);
        }

    }
}
