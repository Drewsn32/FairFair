using System;
using System.Collections.Generic;

namespace App.NewFairFair.Models.Responses
{
    public class CheckOutResponse : BaseResponse
    {
        // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);

        public CheckOutData Data { get; set; }
        public class CheckOutData
        {
            public string transaction_id { get; set; }
            public string user_id { get; set; }
            public object agency_id { get; set; }
            public List<Route> routes { get; set; }
            public List<Passenger> passengers { get; set; }
            public object gb_payment { get; set; }
            public object tr_payment { get; set; }
        }

        public class Fare
        {
            public int route_no { get; set; }
            public int segment_no { get; set; }
            public string segment_ref { get; set; }
            public string seat_ref { get; set; }
            public string seat_number { get; set; }
            public string seat_floor { get; set; }
            public string ticket_no { get; set; }
            public string class_code { get; set; }
            public string agent { get; set; }
            public double ticket_price { get; set; }
            public double fee { get; set; }
            public double tax { get; set; }
            public double discount { get; set; }
            public double amount { get; set; }
            public object gb_fare { get; set; }
            public object tr_fare { get; set; }
        }

        public class Passenger
        {
            public string passenger_id { get; set; }
            public int passenger_no { get; set; }
            public string type_code { get; set; }
            public object title_id { get; set; }
            public string name { get; set; }
            public string surname { get; set; }
            public string phone_number { get; set; }
            public string idcard_type { get; set; }
            public string idcard { get; set; }
            public string email { get; set; }
            public object dob { get; set; }
            public string insure { get; set; }
            public object gender { get; set; }
            public List<Fare> fares { get; set; }
        }

        public class Route
        {
            public string agent { get; set; }
            public int index { get; set; }
            public string routeType { get; set; }
            public int totalMinute { get; set; }
            public int remainingseat { get; set; }
            public double price { get; set; }
            public double total_price { get; set; }
            public DateTime departDateTime { get; set; }
            public List<Segment> segments { get; set; }
        }

        public class Segment
        {
            public int route_no { get; set; }
            public int segment_no { get; set; }
            public string segment_ref { get; set; }
            public string class_code { get; set; }
            public string class_name { get; set; }
            public string boarding_stop_id { get; set; }
            public string dropoff_stop_id { get; set; }
            public string boarding_stop_name { get; set; }
            public string boarding_province_Name { get; set; }
            public string dropoff_stop_name { get; set; }
            public string dropoff_province_name { get; set; }
            public string routename { get; set; }
            public DateTime boardingDateTime { get; set; }
            public DateTime dropoffDateTime { get; set; }
            public int totalMinute { get; set; }
            public string bustype { get; set; }
            public int totalseat { get; set; }
            public int remainingseat { get; set; }
            public double price { get; set; }
            public double total_price { get; set; }
            public double adt_price { get; set; }
            public double chd_price { get; set; }
            public double src_price { get; set; }
            public string agent { get; set; }
        }
    }
}
