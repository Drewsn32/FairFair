using App.Resources;
using System.ComponentModel.DataAnnotations;

namespace App.BusinessEntities.Requests.Identities
{
    public class LoginCreateRequest : BaseRequest
    {
        [Required(AllowEmptyStrings = false, ErrorMessageResourceName = "Required", ErrorMessageResourceType = typeof(lang))]
        public string UserName { get; set; }

        [DataType(DataType.Password)]
        [Required(AllowEmptyStrings = false, ErrorMessageResourceName = "Required", ErrorMessageResourceType = typeof(lang))]
        public string Password { get; set; }
    }
}
