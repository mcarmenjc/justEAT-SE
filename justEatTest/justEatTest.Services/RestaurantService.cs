using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using JustEatTest.Services.Entities;

namespace JustEatTest.Services
{
	public class RestaurantService
	{
		private HttpClient _httpClient;
		public RestaurantService(HttpClient httpClient)
		{
			_httpClient = httpClient;
		}

		public IList<Restaurant> GetRestaurants(string outcode)
		{
			IList<Restaurant> restaurants = new List<Restaurant>();
			if (!string.IsNullOrEmpty(outcode))
			{
				restaurants = GetRestaurantFromAPI(outcode).Result;
			}
			return restaurants;
		}

		private async Task<IList<Restaurant>> GetRestaurantFromAPI(string outcode)
		{
			JustEATResponse result = new JustEATResponse();
			_httpClient.BaseAddress = new Uri("http://api-interview.just-eat.com/");
			AddHttpClientRequestHeaders();
			HttpResponseMessage response = await _httpClient.GetAsync(string.Format("restaurants?q={0}", outcode));
			if (response.IsSuccessStatusCode)
			{
				result = await response.Content.ReadAsAsync<JustEATResponse>();
			}
			return result.Restaurants;
		}

		private void AddHttpClientRequestHeaders()
		{
			_httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", "VGVjaFRlc3RBUEk6dXNlcjI=");
			_httpClient.DefaultRequestHeaders.AcceptLanguage.Clear();
			_httpClient.DefaultRequestHeaders.AcceptLanguage.Add(new StringWithQualityHeaderValue("en-GB"));
			_httpClient.DefaultRequestHeaders.Host = "api-interview.just-eat.com";
			_httpClient.DefaultRequestHeaders.Add("Accept-Tenant", "uk");
		}
	}
}
