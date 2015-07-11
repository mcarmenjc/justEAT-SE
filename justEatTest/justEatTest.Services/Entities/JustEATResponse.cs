using System;
using System.Collections.Generic;

namespace JustEatTest.Services.Entities
{
	public class JustEATResponse
	{
		public IList<Restaurant> Restaurants { get; set; }
		public string ShortResultText { get; set; }
	}
}

