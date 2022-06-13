using System.Collections.Generic;

namespace App.NewFairFair.Models.Responses
{
    public class SeatMapResponse : BaseResponse
    {
        public SeatMapData Data { get; set; }
        public class SeatMapData
        {
            public string segment_ref { get; set; }
            public string tr_trip_id { get; set; }
            public string boarding_stop_id { get; set; }
            public string dropoff_stop_id { get; set; }
            public string tr_seat_layout_id { get; set; }
            public string name { get; set; }
            public int floor_amount { get; set; }
            public List<FloorDetail> floor_detail { get; set; }
            public List<SeatLayoutDetail> seat_layout_detail { get; set; }
            public string floor_sequence { get; set; }
            public int seat_amount { get; set; }
        }

        public class FloorDetail
        {
            public int floor { get; set; }
            public int row_amount { get; set; }
            public int col_amount { get; set; }
        }

        public class ObjectCodeSeat
        {
            public string seat_number { get; set; }
            public string seat_status { get; set; }
            public string passenger_type_code { get; set; }
            public string gender { get; set; }
        }

        public class SeatLayoutDetail
        {
            public int z { get; set; }
            public int y { get; set; }
            public int x { get; set; }
            public string class_code { get; set; }
            public string object_code { get; set; }
            public ObjectCodeSeat object_code_seat { get; set; }
        }


    }
}
