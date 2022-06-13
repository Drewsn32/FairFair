using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace App.BusinessEntities.Enums
{
    public enum AppClassCode
    {
        [Display(Name = "Premium first class")]
        P,
        [Display(Name = "First class")]
        F,
        [Display(Name = "Premium business class")]
        J,
        [Display(Name = "Business class")]
        C,
        [Display(Name = "Premium economy class")]
        W,
        [Display(Name = "Economy class")]
        Y
    }

    public enum AppRole
    {
        [Display(Name = "Super Admin")]
        SuperAdmin = 0,
        [Display(Name = "Admin")]
        Admin = 1,
        [Display(Name = "Member")]
        Member = 1
    }
    public enum AppBooking
    {
        Active,
        Expire
    }
    public enum AppSeatProvider
    {
        Departure = 1,
        Arrival = 2
    }
    public enum AppTripType
    {
        [Display(Name = "Oneway")]
        [Description("One way")]
        OW,
        [Display(Name = "Roundtrip")]
        [Description("Round trip")]
        RT
    }

    public enum AppSeatTypeCode
    {
        [Display(Name = "ทางเดิน")]
        W,
        [Display(Name = "ที่นั่ง")]
        S
    }
    public enum AppSeatMapObjectType
    {
        Seat,
        Stair,
        Walkway,
        Toilet,
        ExtraSeat,
        Empty,
        Driver,
        WheelSeat,
        Wheel,
        HandyCappedSeat
    }

    public enum AppSeatStatus
    {
        [Display(Name = "ที่นั่งมีการ mark แล้ว")]
        Marked,
        [Display(Name = "ที่นั่งมีการจองแล้ว")]
        Booked,
        [Display(Name = "ที่นั่งมีการขายแล้ว")]
        Sold,
        [Display(Name = "ที่นั่งว่าง")]
        Available,
        [Display(Name = "ที่นั่งไม่อนุญาตให้ทำรายการ")]
        Blocked
    }
    public enum AppBusAgency
    {
        [Display(Name = "Green Bus")]
        GB,
        [Display(Name = "Thai Route")]
        TR
    }
    public enum AppIDCardType
    {
        [Display(Name = "ID Card")]
        IDCard,
        [Display(Name = "Passport")]
        Passport,
        [Display(Name = "Children")]
        Children
    }
    public enum AppCard
    {
        Recommend,
        Fastest,
        Cheapest,
        Normal
    }
    public enum AppPaymentMethod
    {
        CraditCard = 1,
        BankTransfer = 2
    }
    public enum AppTitle
    {
        [Display(Name = "Mr.")]
        MR = 1,
        [Display(Name = "Ms.")]
        MS = 2,
        [Display(Name = "Mrs.")]
        Mrs = 3
    }
    public enum AppGender
    {
        [Display(Name = "ชาย")]
        M = 1,
        [Display(Name = "หญิง")]
        F = 2,
        [Display(Name = "ไม่ระบุเพศ")]
        U = 3
    }
    public enum AppLanguage
    {
        [Display(Name = "en-US")]
        EN = 1,
        [Display(Name = "th-TH")]
        TH = 2
    }
    public enum AppPassengerType
    {
        [Display(Name = "Adult")]
        ADT,
        [Display(Name = "Child")]
        CHD,
        [Display(Name = "Infant")]
        INF,
        [Display(Name = "Src")]
        SRC
    }

    public enum AppDepartureTime
    {
        [Display(Name = "Morning")]
        [Description("05:00-11:59")]
        Morning = 0,
        [Display(Name = "Afternoon")]
        [Description("12:00-17:59")]
        Afternoon = 1,
        [Display(Name = "Evening")]
        [Description("18:00-20:59")]
        Evening = 2,
        [Display(Name = "Night")]
        [Description("21:00-04:59")]
        Night = 3
    }
    public enum AppStatusCode
    {
        Success = 200,
        IsValid,
        Error = 400,
        Unauthorized = 401,
        PaymentRequired,
        Forbidden,
        NotFound = 404,
        InternalError = 500,
        DuplicateTrue,
        DuplicateFalse
    }
}
