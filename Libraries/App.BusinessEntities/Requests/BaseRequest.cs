using System;
using System.Text.Json.Serialization;

namespace App.BusinessEntities.Requests
{
    [Serializable]
    public abstract class BaseRequest
    {
        public int IDS { get; set; }
        public Guid Id { get; set; }
        [JsonIgnore]
        public ServiceStatus ServiceStatus { get; set; } = new ServiceStatus();
    }
}