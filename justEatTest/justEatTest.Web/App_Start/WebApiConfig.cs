using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Onalytica.ContentSeeding.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // This call is required to map the [Route] attributes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
