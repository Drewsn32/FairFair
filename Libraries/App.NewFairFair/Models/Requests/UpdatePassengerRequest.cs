namespace App.NewFairFair.Models.Requests
{
    public class UpdatePassengerRequest
    {
        public string transaction_id { get; set; }
        public Passenger[] passengers { get; set; }
        public class Passenger
        {
            public string passenger_id { get; set; }
            public int passenger_no { get; set; }
            public string type_code { get; set; }
            public string title_id { get; set; }
            public string name { get; set; }
            public string surname { get; set; }
            public string phone_number { get; set; }
            public string idcard_type { get; set; }
            public string idcard { get; set; }
            public string email { get; set; }
            public string dob { get; set; }
            public string insure { get; set; }
        }

    }
}
