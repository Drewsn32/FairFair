using System;
using System.Collections.Generic;

namespace App.NewFairFair.Models.Requests
{
    public class CreateCheckOutRequest
    {
        public string language { get; set; }
        public string user_id { get; set; }
        public object agency_id { get; set; }
        public int adt_count { get; set; }
        public int chd_count { get; set; }
        public int src_count { get; set; }
        public List<Route> routes { get; set; }

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
