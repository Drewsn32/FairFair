using App.BusinessEntities.Enums;
using App.BusinessEntities.Requests.Clients;
using App.BusinessEntities.Responses;
using App.BusinessEntities.VMs.Clients;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace App.BackOffice
{
    public class ServiceBackOfficeConnect : IServiceBackOfficeConnect
    {
        private readonly string _webAPIBaseUrl;
        protected string _accessToken;

        public ServiceBackOfficeConnect(string accessToken, string webAPIBaseUrl = "https://fairfairbackoffice.azurewebsites.net")
        {
            _accessToken = accessToken;
            _webAPIBaseUrl = webAPIBaseUrl;
        }
        public async Task<Response<ApplicationUserVM>> PostLoginAsync(LoginRequest request)
        {
            //CheckIfTokenIsValid();
            try
            {
                using (var client = CreateClient())
                {
                    var fullPath = $"{_webAPIBaseUrl}/api/b2bapi/login";

                    var response = await client.PostAsync(fullPath, new JsonContent(request));

                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        var s = await response.Content.ReadAsStringAsync();

                        var json = JsonConvert.DeserializeObject<Response<ApplicationUserVM>>(s);
                        json.ServiceStatus.StatusCode = AppStatusCode.Success;
                        return json;
                    }
                }
            }
            catch (Exception ex)
            {

            }

            return null;
        }
        public class JsonContent : StringContent
        {
            public JsonContent(object obj)
                : base(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json")
            {

            }
        }
        public HttpClient CreateClient()
        {
            var client = new HttpClient();
            //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);

            return client;
        }
        public virtual void SetAccessToken(string accessToken)
        {
            _accessToken = accessToken;
        }
        public void CheckIfTokenIsValid()
        {
            if (string.IsNullOrWhiteSpace(_accessToken))
            {
                throw new Exception("There is no access token currently loaded to access the Line." +
                    "Please load a new access token and try again");
            }
        }
    }
}
