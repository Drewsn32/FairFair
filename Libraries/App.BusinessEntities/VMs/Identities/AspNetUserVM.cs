namespace App.BusinessEntities.VMs.Identities
{
    public class AspNetUserVM : BaseViewModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string StationName { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
