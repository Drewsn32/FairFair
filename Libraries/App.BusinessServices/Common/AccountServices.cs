using App.BackOffice;
using App.BusinessEntities.Enums;
using App.BusinessEntities.Requests;
using App.BusinessEntities.Requests.Clients;
using App.BusinessEntities.Requests.Identities;
using App.BusinessEntities.Responses;
using App.BusinessEntities.VMs.Clients;
using App.BusinessEntities.VMs.Identities;
using AutoMapper;
using System.Threading.Tasks;

namespace App.BusinessServices.Common
{
    public class AccountServices : BaseService, IAccountServices
    {
        private readonly IServiceBackOfficeConnect _serviceBackOfficeConnect;
        public AccountServices(
            IServiceBackOfficeConnect serviceBackOfficeConnect)
        {
            _serviceBackOfficeConnect = serviceBackOfficeConnect;
        }

        public Request<LoginCreateRequest> LoginCreateRequest()
        {
            var response = new Request<LoginCreateRequest>();
            response.Data = new LoginCreateRequest();
            response.ServiceStatus.StatusCode = AppStatusCode.Success;

            return response;
        }

        public async Task<Response<AspNetUserVM>> PasswordSignInAsync(string username, string password)
        {
            var response = new Response<AspNetUserVM>();

            var aspNetUser = await _serviceBackOfficeConnect.PostLoginAsync(new LoginRequest
            {
                Password = password,
                UserName = username
            });

            if (aspNetUser == null)
            {
                aspNetUser = new Response<ApplicationUserVM>();
                response.ServiceStatus.StatusMessage = "login attempt";
            }

            if (aspNetUser.ServiceStatus.StatusCode == AppStatusCode.Success)
            {
                response.ServiceStatus.StatusCode = AppStatusCode.Success;
                response.Data = new AspNetUserVM
                {
                    FirstName = aspNetUser.Data.FirstName,
                    LastName = aspNetUser.Data.LastName,
                    Email = aspNetUser.Data.Email,
                    Username = aspNetUser.Data.UserName,
                    TotalPrice = 0,
                    StationName = aspNetUser.Data.AgencyName,
                };
            }
            else
            {
                response.ServiceStatus.StatusMessage = "login attempt";
            }

            return response;
        }
    }
}
