var isLocal = true;
var devLocalRoot = "https://localhost:44360/";
var prodLocalRoot = "https://fairfair-b2b-uat.azurewebsites.net/";

var rootHost = devLocalRoot;

if (isLocal === false) {
    rootHost = prodLocalRoot;
}
var busSeatAPI = rootHost + "bus/seatmap";
var listBoardingAPI = rootHost + "bus/listBoarding";
var busSearchAPI = rootHost + "bus/search";
var listDropOffAPI = rootHost + "bus/listDropoff";
var busLockSeatAPI = rootHost + "bus/lockseat";
var busUnLockSeatAPI = rootHost + "bus/unlockseat";
var busPassengerAPI = rootHost + "passenger/create";
var busTicketAPI = rootHost + "ticket/create";
var busPrintTicketAPI = rootHost + "ticket/print";
var busTicketSearchAPI = rootHost + "ticket/search";

currentReat = null;
currentReatReturn = null;
currentPanalProvider = 1;
var seatChecks = [];