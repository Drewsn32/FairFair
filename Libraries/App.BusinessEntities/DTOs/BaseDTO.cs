using System;

namespace App.BusinessEntities.DTOs
{
    public abstract class BaseDTO
    {
        public Guid Id { get; set; }
        public long IDS { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
