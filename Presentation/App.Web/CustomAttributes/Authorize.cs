using App.BusinessEntities.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using System.Security.Claims;

namespace App.Web.CustomAttributes
{
    public class AuthorizeAttribute : TypeFilterAttribute
    {
        public AuthorizeAttribute(params AppRole[] claim) : base(typeof(AuthorizeFilter))
        {
            Arguments = new object[] { claim };
        }
    }

    public class AuthorizeFilter : IAuthorizationFilter
    {
        readonly AppRole[] _claim;

        public AuthorizeFilter(params AppRole[] claim)
        {
            _claim = claim;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var IsAuthenticated = context.HttpContext.User.Identity.IsAuthenticated;

            if (IsAuthenticated)
            {
                bool flagClaim = false;
                foreach (var item in _claim)
                {
                    string abc = item.ToString();
                    if (context.HttpContext.User.HasClaim(ClaimTypes.Role, item.ToString()))
                        flagClaim = true;
                }

                if (!flagClaim)
                {
                    if (context.HttpContext.Request.IsAjaxRequest())
                        context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    else
                        context.Result = new RedirectResult("~/Dashboard/NoPermission");
                }
            }
            else
            {
                if (context.HttpContext.Request.IsAjaxRequest())
                {
                    context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                }
                else
                {
                    context.Result = new RedirectResult("~/Account/Login");
                }
            }
            return;
        }
    }
}
