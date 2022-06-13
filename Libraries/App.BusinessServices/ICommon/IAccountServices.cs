using App.BusinessEntities.Requests;
using App.BusinessEntities.Requests.Identities;
using App.BusinessEntities.Responses;
using App.BusinessEntities.VMs.Identities;
using System.Threading.Tasks;

namespace App.BusinessServices.Common
{
    public interface IAccountServices
    {
        Request<LoginCreateRequest> LoginCreateRequest();
        Task<Response<AspNetUserVM>> PasswordSignInAsync(string username, string password);
    }
}
