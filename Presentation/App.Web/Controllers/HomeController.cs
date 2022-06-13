using App.BusinessEntities.Enums;
using App.Web.CustomAttributes;
using Microsoft.AspNetCore.Mvc;

namespace App.Web.Controllers
{
    [Authorize(AppRole.SuperAdmin)]
    public class HomeController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
