using justEAT_SE.Controllers;
using justEAT_SE.Entities;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Text;
using System.Threading.Tasks;

namespace justEAT_SE.Tests
{
    [TestFixture]
    public class OutcodeRestaurantsControllerTest
    {
        [Test]
        public void GetRestaurantsShouldRetrieveNotNullRestaurantListFromServer()
        {
            const string outcode = "se19";
            OutcodeRestaurantsController controller = CreateOutcodeRestaurantController(outcode, CreateSuccessResponse(outcode));
            IList<Restaurant> restaurants = controller.GetRestaurants(outcode);
            Assert.IsNotNull(restaurants);
        }

        [Test]
        public void GetRestaurantsShouldRetrieveOneElementRestaurantListFromServer()
        {
            const string outcode = "se19";
            OutcodeRestaurantsController controller = CreateOutcodeRestaurantController(outcode, CreateSuccessResponse(outcode));
            IList<Restaurant> restaurants = controller.GetRestaurants(outcode);
            Assert.AreEqual(1, restaurants.Count);
        }

        [Test]
        public void GetRestaurantsShouldRetrieveCorrectRestaurantListFromServer()
        {
            const string outcode = "se19";
            OutcodeRestaurantsController controller = CreateOutcodeRestaurantController(outcode, CreateSuccessResponse(outcode));
            IList<Restaurant> restaurants = controller.GetRestaurants(outcode);
            OutcodeQuery expectedOutcode = CreateFakeResponse(outcode);
            AssertRestaurantIsCorrect(expectedOutcode.Restaurants[0], restaurants[0]);
        }

        [Test]
        public void GetRestaurantsShouldGetNullListIfThereIsAnError()
        {
            const string outcode = "se19";
            OutcodeRestaurantsController controller = CreateOutcodeRestaurantController(outcode, CreateErrorResponse());
            IList<Restaurant> restaurants = controller.GetRestaurants(outcode);
            OutcodeQuery expectedOutcode = CreateFakeResponse(outcode);
            Assert.IsNull(restaurants);
        }

        [Test]
        public void GetRestaurantsShouldGetEmptyListIfOutcodeIsEmptyString()
        {
            const string outcode = "";
            HttpClient httpClient = new HttpClient();
            OutcodeRestaurantsController controller = new OutcodeRestaurantsController(httpClient);
            IList<Restaurant> restaurants = controller.GetRestaurants(outcode);
            OutcodeQuery expectedOutcode = CreateFakeResponse(outcode);
            Assert.AreEqual(0, restaurants.Count);
        }

        private void AssertRestaurantIsCorrect(Restaurant expectedRestaurant, Restaurant restaurant)
        {
            Assert.AreEqual(expectedRestaurant.Name, restaurant.Name);
            Assert.AreEqual(expectedRestaurant.RatingStars, restaurant.RatingStars);
            Assert.AreEqual(expectedRestaurant.NumberOfRatings, restaurant.NumberOfRatings);
            Assert.AreEqual(expectedRestaurant.CuisineTypes.Count, restaurant.CuisineTypes.Count);
            Assert.AreEqual(expectedRestaurant.CuisineTypes[0].Name, restaurant.CuisineTypes[0].Name);
        }

        private OutcodeQuery CreateFakeResponse(string outcode)
        {
            OutcodeQuery result = new OutcodeQuery()
            {
                ShortResultText = outcode,
                Restaurants = new List<Restaurant>()
            };

            IList<CuisineType> types = new List<CuisineType>();
            types.Add(new CuisineType()
            {
                Name = "Indian"
            });
            result.Restaurants.Add(new Restaurant()
            {
                Name = "Restaurant1",
                RatingStars = 5,
                NumberOfRatings = 10,
                CuisineTypes = types
            });
            return result;
        }

        private HttpResponseMessage CreateErrorResponse()
        {
            HttpResponseMessage response = new HttpResponseMessage(System.Net.HttpStatusCode.NotFound);
            return response;
        }

        private HttpResponseMessage CreateSuccessResponse(string outcode)
        {
            HttpResponseMessage response = new HttpResponseMessage(System.Net.HttpStatusCode.OK);
            response.Content = new ObjectContent<OutcodeQuery>(CreateFakeResponse(outcode), new JsonMediaTypeFormatter());
            return response;
        }

        private OutcodeRestaurantsController CreateOutcodeRestaurantController(string outcode, HttpResponseMessage response)
        {
            Mock<FakeHttpMessageHandler> msgHandler = CreateFakeHttpMessageHandlerMock(outcode, response);
            HttpClient fakeHttpClient = new HttpClient(msgHandler.Object);
            OutcodeRestaurantsController controller = new OutcodeRestaurantsController(fakeHttpClient);
            return controller;
        }

        private Mock<FakeHttpMessageHandler> CreateFakeHttpMessageHandlerMock(string outcode, HttpResponseMessage response)
        {
            Mock<FakeHttpMessageHandler> msgHandler = new Mock<FakeHttpMessageHandler>() { CallBase = true };
            msgHandler.Setup(t => t.Send(It.Is<HttpRequestMessage>(
                msg =>
                    msg.Method == HttpMethod.Get &&
                    msg.RequestUri.ToString().Contains(string.Format("restaurants?q={0}", outcode)))))
                    .Returns(response);
            return msgHandler;
        }
    }
}
