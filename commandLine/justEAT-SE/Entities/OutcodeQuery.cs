using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace justEAT_SE.Entities
{
    public class OutcodeQuery
    {
        public IList<Restaurant> Restaurants { get; set; }
        public string ShortResultText { get; set; }
    }
}
