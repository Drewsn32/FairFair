using AutoMapper;

namespace App.BusinessServices
{
    public class AutoMap
    {
        public static IMapper CreateMapper()
        {
            return new MapperConfiguration(c =>
            {
                //c.CreateMap<SearchBusResponse.Segment, DomainBusSegmentDTO>()
                //.ForMember(s => s.RouteNo, opt => opt.MapFrom(src => src.route_no))
                //.ForMember(s => s.SegmentNo, opt => opt.MapFrom(src => src.segment_no))
                //.ForMember(s => s.SegmentRef, opt => opt.MapFrom(src => src.segment_ref))
                //.ForMember(s => s.ClassCode, opt => opt.MapFrom(src => src.class_code))
                //.ForMember(s => s.ClassName, opt => opt.MapFrom(src => src.class_name))
                //.ForMember(s => s.BoardingStopId, opt => opt.MapFrom(src => src.boarding_stop_id))
                //.ForMember(s => s.DropoffStopId, opt => opt.MapFrom(src => src.dropoff_stop_id))
                //.ForMember(s => s.BoardingStopName, opt => opt.MapFrom(src => src.boarding_stop_name))
                //.ForMember(s => s.BoardingProvinceName, opt => opt.MapFrom(src => src.boarding_province_Name))
                //.ForMember(s => s.DropoffStopName, opt => opt.MapFrom(src => src.dropoff_stop_name))
                //.ForMember(s => s.DropoffProvinceName, opt => opt.MapFrom(src => src.dropoff_province_name))
                //.ForMember(s => s.TotalPrice, opt => opt.MapFrom(src => src.total_price))
                //.ForMember(s => s.AdtPrice, opt => opt.MapFrom(src => src.adt_price))
                //.ForMember(s => s.ChdPrice, opt => opt.MapFrom(src => src.chd_price))
                //.ForMember(s => s.SrcPrice, opt => opt.MapFrom(src => src.src_price))
                //.ReverseMap();
            }).CreateMapper();
        }

    }
}
