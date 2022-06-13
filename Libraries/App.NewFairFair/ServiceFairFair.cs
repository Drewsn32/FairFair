using App.NewFairFair.Models.Requests;
using App.NewFairFair.Models.Responses;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace App.NewFairFair
{
    public class ServiceFairFair : IServiceFairFair
    {
        private readonly string _webAPIBaseUrl;
        protected string _accessToken;

        public ServiceFairFair(string accessToken, string webAPIBaseUrl = "https://fairfairbackoffice.azurewebsites.net/api/FairFair")
        {
            _accessToken = accessToken;
            _webAPIBaseUrl = webAPIBaseUrl;
        }
        public async Task<UpdatePassengerResponse> PostUpdatePassengerAsync(UpdatePassengerRequest request)
        {
            CheckIfTokenIsValid();

            try
            {
                using (var client = CreateClient())
                {
                    //ServicePointManager.Expect100Continue = true;
                    //ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                    var fullPath = $"{_webAPIBaseUrl}/updatepassenger";

                    var response = await client.PostAsync(fullPath, new JsonContent(request));

                    var s = await response.Content.ReadAsStringAsync();

                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        return JsonConvert.DeserializeObject<UpdatePassengerResponse>(s);
                    }
                }
            }
            catch (Exception ex)
            {
                //
            }

            return null;
        }
        public async Task<LockSeatResponse> PostLockSeatAsync(LockSeatRequest request)
        {
            CheckIfTokenIsValid();

            try
            {
                using (var client = CreateClient())
                {
                    //ServicePointManager.Expect100Continue = true;
                    //ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                    var fullPath = $"{_webAPIBaseUrl}/lockseat";

                    var response = await client.PostAsync(fullPath, new JsonContent(request));

                    var s = await response.Content.ReadAsStringAsync();

                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        return JsonConvert.DeserializeObject<LockSeatResponse>(s);
                    }
                }
            }
            catch (Exception ex)
            {
                //
            }

            return null;
        }
        public async Task<SeatMapResponse> PostSeatMapAsync(SeatMapRequest request)
        {
            CheckIfTokenIsValid();

            try
            {
                using (var client = CreateClient())
                {
                    //ServicePointManager.Expect100Continue = true;
                    //ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                    var fullPath = $"{_webAPIBaseUrl}/getseatmap";

                    var response = await client.PostAsync(fullPath, new JsonContent(request));

                    var s = await response.Content.ReadAsStringAsync();

                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        return JsonConvert.DeserializeObject<SeatMapResponse>(s);
                    }
                }
            }
            catch (Exception ex)
            {
                //
            }

            return null;
        }
        public async Task<CheckOutResponse> PostCreateCheckOutAsync(CreateCheckOutRequest request)
        {
            CheckIfTokenIsValid();

            try
            {
                using (var client = CreateClient())
                {
                    //ServicePointManager.Expect100Continue = true;
                    //ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                    var fullPath = $"{_webAPIBaseUrl}/createcheckout";

                    var response = await client.PostAsync(fullPath, new JsonContent(request));

                    var s = await response.Content.ReadAsStringAsync();

                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        return JsonConvert.DeserializeObject<CheckOutResponse>(s);
                    }
                }
            }
            catch (Exception ex)
            {
                //
            }

            return null;
        }
        public async Task<SearchBusResponse> PostSearchBusAsync(SearchBusRequest request)
        {
            CheckIfTokenIsValid();

            try
            {
                using (var client = CreateClient())
                {
                    //ServicePointManager.Expect100Continue = true;
                    //ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                    var fullPath = $"{_webAPIBaseUrl}/searchbus";

                    var response = await client.PostAsync(fullPath, new JsonContent(request));

                    var s = await response.Content.ReadAsStringAsync();

                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        return JsonConvert.DeserializeObject<SearchBusResponse>(s);
                    }
                }
            }
            catch (Exception ex)
            {
                //
            }

            return null;
        }
        public async Task<SearchEndStationResponse> PostSearchEndStationAsync(SearchEndStationRequest request)
        {
            CheckIfTokenIsValid();

            try
            {
                using (var client = CreateClient())
                {
                    //ServicePointManager.Expect100Continue = true;
                    //ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                    var fullPath = $"{_webAPIBaseUrl}/searchendstation";

                    var response = await client.PostAsync(fullPath, new JsonContent(request));

                    var s = await response.Content.ReadAsStringAsync();

                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        return JsonConvert.DeserializeObject<SearchEndStationResponse>(s);
                    }
                }
            }
            catch (Exception ex)
            {
                //
            }

            return null;
        }

        public async Task<SearchBeginStationResponse> PostSearchBeginStationAsync(SearchBeginStationRequest request)
        {
            CheckIfTokenIsValid();

            try
            {
                using (var client = CreateClient())
                {
                    //ServicePointManager.Expect100Continue = true;
                    //ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                    var fullPath = $"{_webAPIBaseUrl}/searchbeginstation";

                    var response = await client.PostAsync(fullPath, new JsonContent(request));

                    var s = await response.Content.ReadAsStringAsync();

                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        return JsonConvert.DeserializeObject<SearchBeginStationResponse>(s);
                    }
                }
            }
            catch (Exception ex)
            {
                //
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
        public void CheckIfTokenIsValid()
        {
            //if (string.IsNullOrWhiteSpace(_payment2C2PPoll.SecretKey))
            //{
            //    throw new Exception("There is no access token currently loaded to access the Line." +
            //        "Please load a new access token and try again");
            //}
        }
        public HttpClient CreateClient()
        {
            var client = new HttpClient();
            //client.DefaultRequestHeaders.Add("x-api-key", _payment2C2PPoll.SecretKey);

            return client;
        }

        
    }
}
