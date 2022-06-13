using System;
using System.Text;

namespace App.BusinessServices
{

    public abstract class BaseService : IBaseService
    {
        protected Guid _id = Guid.NewGuid();
        public virtual void Dispose() { }
        public Guid Id
        {
            get
            {
                return _id;
            }
        }

        public string GetError(Exception ex)
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
