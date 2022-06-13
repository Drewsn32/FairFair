using System;

namespace App.BusinessServices
{
    public interface IBaseService
    {
        Guid Id { get; }
        void Dispose();
        string GetError(Exception ex);
    }
}
