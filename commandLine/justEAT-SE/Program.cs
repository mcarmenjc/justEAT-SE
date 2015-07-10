using justEAT_SE.Controllers;
using justEAT_SE.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace justEAT_SE
{
    public class Program
    {
        static void Main(string[] args)
        {
            HttpClient client = new HttpClient();
            OutcodeRestaurantsController outcodeController = new OutcodeRestaurantsController(client);

            string outcode = string.Empty;
            while (string.IsNullOrEmpty(outcode))
            {
                Console.Write("Enter Outcode: ");
                outcode = Console.ReadLine();
            }
            IList<Restaurant> restaurants = outcodeController.GetRestaurants(outcode);
            if (restaurants != null && restaurants.Count > 0)
            {
                PrintRestaurants(outcode, restaurants);
            }
            else
            {
                Console.Write("No restaurants found\n");
            }
            Console.ReadLine();
        }

        private static void PrintRestaurants(string outcode, IList<Restaurant> restaurants)
        {
            Console.Write(string.Format("List of restaurants in {0}:\n", outcode));
            foreach (Restaurant restaurant in restaurants)
            {
                PrintRestaurantInfo(restaurant);
            }
        }

        private static void PrintRestaurantInfo(Restaurant restaurant)
        {
            Console.Write(string.Format(" * {0}:\n", restaurant.Name));
            Console.Write(string.Format("\t - Rating Stars: {0}\n", restaurant.RatingStars));
            Console.Write(string.Format("\t - Number Of Rating: {0}\n", restaurant.NumberOfRatings));
            Console.Write("\t - Cuisine Types: \n");
            foreach (CuisineType type in restaurant.CuisineTypes)
            {
                Console.Write(string.Format("\t\t - {0}\n", type.Name));
            }
        }
    }
}
