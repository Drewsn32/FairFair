using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Text;

namespace App.Web.Controllers
{
    public class BaseController : Controller
    {
        private Guid _aspNetUserId = Guid.Empty;
        private string _stationName = string.Empty;
        protected Guid AspNetUserId
        {
            get
            {
                return _aspNetUserId = User.FindFirstValue(ClaimTypes.NameIdentifier) != null ? Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)) : _aspNetUserId;
            }
            set
            {
                _aspNetUserId = value;
            }
        }
        protected string StationName
        {
            get
            {
                return _stationName = User.FindFirstValue(ClaimTypes.NameIdentifier) != null ? User.FindFirstValue(ClaimTypes.Sid) : _stationName;
            }
            set
            {
                _stationName = value;
            }
        }
        
        protected class ContentMessages
        {
            public static readonly string InvalidValueErrorMessage = "Invalid value";
        }

        protected string GetError(Exception ex)
        {
            var st = new System.Diagnostics.StackTrace(ex, true);
            var frames = st.GetFrames();
            var traceString = new StringBuilder();

            traceString.Append(ex.Message);
            traceString.Append(!ReferenceEquals(null, ex.InnerException) ? ex.InnerException.Message : string.Empty);

            foreach (var frame in frames)
            {
                if (frame.GetFileLineNumber() < 1)
                    continue;

                traceString.Append("File: " + frame.GetFileName());
                traceString.Append(", Method:" + frame.GetMethod().Name);
                traceString.Append(", LineNumber: " + frame.GetFileLineNumber());
                traceString.Append("  -->  ");
            }

            return traceString.ToString();
        }
    }
}
