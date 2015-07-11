using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Net.Http;
using JustEatTest.Services;
using JustEatTest.Services.Entities;

namespace JustEatTest.Web.Controllers
{
    public class RestaurantController : ApiController
    {
		[HttpGet]
		public HttpResponseMessage GetRestaurants(string outcode)
		{
			HttpClient client = new HttpClient ();
			RestaurantService restaurantService = new RestaurantService (client);
			IList<Restaurant> restaurants = restaurantService.GetRestaurants (outcode);
			return Request.CreateResponse (System.Net.HttpStatusCode.OK, restaurants);
		}
    }
}
