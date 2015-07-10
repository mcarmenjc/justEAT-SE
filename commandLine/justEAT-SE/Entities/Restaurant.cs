using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace justEAT_SE.Entities
{
    public class Restaurant
    {
        public string Name { get; set; }
        public double RatingStars { get; set; }
        public int NumberOfRatings { get; set; }
        public IList<CuisineType> CuisineTypes { get; set; }
    }
}
