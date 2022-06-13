namespace App.NewFairFair.Models.Responses
{
    public class SearchEndStationResponse : BaseResponse
    {
        public Station[] Data { get; set; }

        public class Station
        {
            public string provinceName { get; set; }
            public string stopName { get; set; }
            public string stop_id { get; set; }
        }
    }
}
