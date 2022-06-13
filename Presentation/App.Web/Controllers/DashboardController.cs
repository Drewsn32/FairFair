using App.Web.CustomAttributes;
using Microsoft.AspNetCore.Mvc;

namespace App.Web.Controllers
{
    [UnAuthorized]
    public class DashboardController : BaseController
    {
        public IActionResult NoPermission()
        {
            ViewBag.Message = "Permission controlled through Authorize Attribute";
            return PartialView("NoPermission");
        }
        public IActionResult Errors()
        {
            ViewBag.Message = "An error occurred.";
            return PartialView("Errors");
        }
    }
}
