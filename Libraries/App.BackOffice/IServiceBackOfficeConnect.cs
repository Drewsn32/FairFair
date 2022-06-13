using App.BusinessEntities.Requests.Clients;
using App.BusinessEntities.Responses;
using App.BusinessEntities.VMs.Clients;
using System.Threading.Tasks;

namespace App.BackOffice
{
    public interface IServiceBackOfficeConnect
    {
        Task<Response<ApplicationUserVM>> PostLoginAsync(LoginRequest request);
    }
}
