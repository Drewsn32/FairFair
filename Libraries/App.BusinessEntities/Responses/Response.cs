using App.BusinessEntities.VMs;
using System.Runtime.Serialization;

namespace App.BusinessEntities.Responses
{
    public class Response<TData> : BaseBusinessEntity where TData : BaseViewModel
    {
        [DataMember]
        public TData Data { get; set; }

        [DataMember]
        public TData[] DataList { get; set; }
        [DataMember]
        public int TotalResult { get; set; }
        [DataMember]
        public int PerPage { get; set; }
        [DataMember]
        public int CurrentPage { get; set; }
        [DataMember]
        public int TotalPage { get; set; }

    }

    public class Response : BaseBusinessEntity
    {
        [DataMember]
        public object Data { get; set; }
    }
}
