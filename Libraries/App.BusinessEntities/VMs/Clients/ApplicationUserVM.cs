using System;
using System.Runtime.Serialization;

namespace App.BusinessEntities.VMs.Clients
{
    public class ApplicationUserVM : BaseViewModel
    {
        [DataMember]
        public Guid UserId { get; set; }
        [DataMember]
        public Guid AgencyId { get; set; }
        [DataMember]
        public string UserName { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string AgencyName { get; set; }
        [DataMember]
        public string Token { get; set; }
    }
}
