using App.NewFairFair.Models.Requests;
using App.NewFairFair.Models.Responses;
using System.Threading.Tasks;

namespace App.NewFairFair
{
    public interface IServiceFairFair
    {
        Task<SearchBeginStationResponse> PostSearchBeginStationAsync(SearchBeginStationRequest request);
        Task<SearchEndStationResponse> PostSearchEndStationAsync(SearchEndStationRequest request);
        Task<SearchBusResponse> PostSearchBusAsync(SearchBusRequest request);
        Task<CheckOutResponse> PostCreateCheckOutAsync(CreateCheckOutRequest request);
        Task<SeatMapResponse> PostSeatMapAsync(SeatMapRequest request);
        Task<LockSeatResponse> PostLockSeatAsync(LockSeatRequest request);
        Task<UpdatePassengerResponse> PostUpdatePassengerAsync(UpdatePassengerRequest request);
    }
}
