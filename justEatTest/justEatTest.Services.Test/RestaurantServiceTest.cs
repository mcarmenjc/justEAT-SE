using System;
using NUnit.Framework;
using System.Collections.Generic;
using JustEatTest.Services.Entities;
using System.Net.Http;
using Moq;
using System.Net.Http.Formatting;

namespace JustEatTest.Services.Test
{
	[TestFixture]
	public class RestaurantServiceTest
	{
		[Test]
		public void GetRestaurantsShouldRetrieveNotNullRestaurantListFromServer()
		{
			const string outcode = "se19";
			RestaurantService service = CreateRestaurantService(outcode, CreateSuccessResponse(outcode));
			IList<Restaurant> restaurants = service.GetRestaurants(outcode);
			Assert.IsNotNull(restaurants);
		}

		[Test]
		public void GetRestaurantsShouldRetrieveOneElementRestaurantListFromServer()
		{
			const string outcode = "se19";
			RestaurantService service = CreateRestaurantService(outcode, CreateSuccessResponse(outcode));
			IList<Restaurant> restaurants = service.GetRestaurants(outcode);
			Assert.AreEqual(1, restaurants.Count);
		}

		[Test]
		public void GetRestaurantsShouldRetrieveCorrectRestaurantListFromServer()
		{
			const string outcode = "se19";
			RestaurantService service = CreateRestaurantService(outcode, CreateSuccessResponse(outcode));
			IList<Restaurant> restaurants = service.GetRestaurants(outcode);
			JustEATResponse expectedResponse = CreateFakeResponse(outcode);
			AssertRestaurantIsCorrect(expectedResponse.Restaurants[0], restaurants[0]);
		}

		[Test]
		public void GetRestaurantsShouldGetNullListIfThereIsAnError()
		{
			const string outcode = "se19";
			RestaurantService service = CreateRestaurantService(outcode, CreateErrorResponse());
			IList<Restaurant> restaurants = service.GetRestaurants(outcode);
			Assert.IsNull(restaurants);
		}

		[Test]
		public void GetRestaurantsShouldGetEmptyListIfOutcodeIsEmptyString()
		{
			const string outcode = "";
			HttpClient httpClient = new HttpClient();
			RestaurantService service = new RestaurantService(httpClient);
			IList<Restaurant> restaurants = service.GetRestaurants(outcode);
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

		private JustEATResponse CreateFakeResponse(string outcode)
		{
			JustEATResponse result = new JustEATResponse()
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
			response.Content = new ObjectContent<JustEATResponse>(CreateFakeResponse(outcode), new JsonMediaTypeFormatter());
			return response;
		}

		private RestaurantService CreateRestaurantService(string outcode, HttpResponseMessage response)
		{
			Mock<FakeHttpMessageHandler> msgHandler = CreateFakeHttpMessageHandlerMock(outcode, response);
			HttpClient fakeHttpClient = new HttpClient(msgHandler.Object);
			RestaurantService service = new RestaurantService(fakeHttpClient);
			return service;
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

