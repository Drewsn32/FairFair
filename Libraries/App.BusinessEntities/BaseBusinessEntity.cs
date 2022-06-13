using System;
using System.Runtime.Serialization;

namespace App.BusinessEntities
{
    [Serializable]
    [DataContract]
    public class BaseBusinessEntity
    {
        [DataMember]
        public long IDS { get; set; }

        [DataMember]
        public Guid Id { get; set; } = Guid.NewGuid();

        [DataMember]
        public DateTime Timestamp { get; set; } = DateTime.Now;

        [DataMember]
        public DateTime LastUpdateTimestamp { get; set; } = DateTime.Now;

        [DataMember]
        public string Success { get; set; }
        [DataMember]
        public string Message { get; set; }

        [DataMember]
        public ServiceStatus ServiceStatus { get; set; } = new ServiceStatus();
    }
}
