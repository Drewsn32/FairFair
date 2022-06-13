using App.BusinessEntities.Enums;

namespace App.BusinessEntities
{
    public class ServiceStatus
    {
        public AppStatusCode StatusCode { get; set; } = AppStatusCode.Error;
        public string StatusMessage { get; set; }
        public string ReasonPhrase { get; set; }
    }

    public class StatusMessage
    {
        public string Message { get; set; }
        public string Description { get; set; }
        public string ReasonPhrase { get; set; }
    }
}
