﻿using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace DigitalBanking
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
