namespace App.NewFairFair.Models.Requests
{
    public class SearchBusRequest
    {
        public string language { get; set; }
        public string departDate { get; set; }
        public string returnDate { get; set; }
        public string boarding_stop_id { get; set; }
        public string dropoff_stop_id { get; set; }
        public int adt_count { get; set; }
        public int chd_count { get; set; }
        public int src_count { get; set; }
    }
}
