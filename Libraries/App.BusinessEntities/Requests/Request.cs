using System.Runtime.Serialization;

namespace App.BusinessEntities.Requests
{
    public class Request<TData> : BaseBusinessEntity where TData : BaseRequest
    {
        [DataMember]
        public TData Data { get; set; }
    }
    
}
