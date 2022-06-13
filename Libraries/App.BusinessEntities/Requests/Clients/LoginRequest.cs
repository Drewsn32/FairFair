namespace App.BusinessEntities.Requests.Clients
{
    public class LoginRequest : BaseRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Language { get; set; }
    }
}
