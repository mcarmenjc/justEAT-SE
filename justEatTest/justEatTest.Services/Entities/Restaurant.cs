using System;
using System.Collections.Generic;

namespace JustEatTest.Services.Entities
{
	public class Restaurant
	{
		public string Name { get; set; }
		public double RatingStars { get; set; }
		public int NumberOfRatings { get; set; }
		public IList<CuisineType> CuisineTypes { get; set; }
	}
}

