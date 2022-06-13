using App.BusinessEntities.Enums;
using App.BusinessEntities.Requests;
using App.BusinessEntities.Requests.Identities;
using App.BusinessServices.Common;
using App.Web.Helpers;
using App.Web.Providers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace App.Web.Controllers
{
    public class AccountController : BaseController
    {
        protected readonly IAccountServices _accountServices;
        private readonly AppSettings _appSettings;

        public AccountController(
            IOptions<AppSettings> appSettings,
            IAccountServices accountServices)
        {
            _accountServices = accountServices;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        public ActionResult Login()
        {
            return PartialView(_accountServices.LoginCreateRequest());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginCreateRequest data, string returnUrl = null)
        {
            var response = new Request<LoginCreateRequest>();
            ViewBag.returnUrl = returnUrl;
            var returnTo = "/Account/Login";

            if (ModelState.IsValid)
            {
                var result = await _accountServices.PasswordSignInAsync(data.UserName, data.Password);
                if (result.ServiceStatus.StatusCode == AppStatusCode.Success)
                {
                    TokenProvider _tokenProvider = new TokenProvider();
                    var userToken = _tokenProvider.GenerateAccessToken(result.Data, _appSettings.Secret);
                    if (!string.IsNullOrEmpty(userToken))
                    {
                        HttpContext.Session.SetString("JWTokenWeb", userToken);
                        returnTo = returnUrl;
                    }
                    return RedirectToLocal(returnTo);
                }
            }

            response.ServiceStatus.StatusMessage = "login attempt";
            response.ServiceStatus.StatusCode = AppStatusCode.IsValid;

            return PartialView(response);
        }
        [CustomAttributes.Authorize(AppRole.SuperAdmin)]
        public IActionResult Logoff()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home");

        }

        [CustomAttributes.Authorize(AppRole.SuperAdmin)]
        public ActionResult Recheck()
        {
            return PartialView();
        }

        [AllowAnonymous]
        public ActionResult Register()
        {
            return PartialView();
        }

        [AllowAnonymous]
        public ActionResult Forgot()
        {
            return PartialView();
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(AccountController.Recheck));
            }
        }
    }
}
