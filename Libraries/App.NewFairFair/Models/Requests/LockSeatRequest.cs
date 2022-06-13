namespace App.NewFairFair.Models.Requests
{
    public class LockSeatRequest
    {
        public string transaction_id { get; set; }
        public string passenger_id { get; set; }
        public int route_no { get; set; }
        public int segment_no { get; set; }
        public int seat_floor { get; set; }
        public string seat_number { get; set; }
    }
}
