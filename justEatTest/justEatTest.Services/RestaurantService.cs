using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using JustEatTest.Services.Entities;
using System.Configuration;

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
			_httpClient.BaseAddress = new Uri(ConfigurationManager.AppSettings["JustEATUrl"]);
			AddHttpClientRequestHeaders();
			HttpResponseMessage response = await _httpClient.GetAsync(string.Format("{0}?q={1}", 
				ConfigurationManager.AppSettings["RestaurantEndPoint"], outcode));
			if (response.IsSuccessStatusCode)
			{
				result = await response.Content.ReadAsAsync<JustEATResponse>();
			}
			return result.Restaurants;
		}

		private void AddHttpClientRequestHeaders()
		{
			_httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
				ConfigurationManager.AppSettings["AuthorizationScheme"], 
				ConfigurationManager.AppSettings["AuthorizationParameter"]);
			_httpClient.DefaultRequestHeaders.AcceptLanguage.Clear();
			_httpClient.DefaultRequestHeaders.AcceptLanguage.Add(new StringWithQualityHeaderValue(
				ConfigurationManager.AppSettings["AcceptLanguage"]));
			_httpClient.DefaultRequestHeaders.Host = ConfigurationManager.AppSettings["Host"];
			_httpClient.DefaultRequestHeaders.Add("Accept-Tenant", 
				ConfigurationManager.AppSettings["AcceptTenant"]);
		}
	}
}
