
var $y = $(window).height() / 8;
var $h = 150;
var $w = 800;

function bindTemplate(data, template, container, isAppend) {
    var tmp = $(template).render(data);
    if (isAppend) {
        $(container).append(tmp);
    }
    else {
        $(container).html(tmp);
    }

    if (template === '#shopBusResultTemplate') {
        lazyLoadImage();
    }
}
function lazyLoadImage() {
    $('.ShopBusResultContainer img.tour').loadScroll(0);
    setTimeout(
        function () {
            window.scrollBy(0, 10);
            window.scrollBy(0, -10);
        }, 500);
}
function postTicketSearchByFeed(postData) {
    postTicketSearchByFeedAPI(postData, function (data) {
        ticketSearchByFeed = data["data"];
        composepostTicketSearchByFeedIfReady();
    });
}

function composepostTicketSearchByFeedIfReady() {
    console.log(ticketSearchByFeed);

    for (var i = 0; i < ticketSearchByFeed.busTicketSearchResult.data.length; i++) {
        var ii = ticketSearchByFeed.busTicketSearchResult.data[i];
        ii.bookingDateFormat = moment(ii.bookingDate).format("DD/MM/YYYY");
        ticketSearchByFeed.busTicketSearchResult.data[i] = ii;
    }

    //busDepartTotal = [];
    //for (var i = 0; i < busSearchByFeed.busDeparture.length; i++) {

    //    var ii = busSearchByFeed.busDeparture[i];
    //    for (var j = 0; j < ii.departList.length; j++) {
    //        var jj = busSearchByFeed.busDeparture[i].departList[j];
    //        if (jj.segmentNo === 1) {
    //            jj.id = ii.id;
    //        }
    //        jj.travelID = jj.price.listPrice[0].travelID;
    //        jj.accordion = "depart";
    //        ii.departList[j] = jj;
    //    }

    //    busDepartTotal.push(ii);
    //}

    //busReturnTotal = [];
    //if (busSearchByFeed.busReturn !== null) {
    //    for (var i = 0; i < busSearchByFeed.busReturn.length; i++) {
    //        var ii = busSearchByFeed.busReturn[i];
    //        for (var j = 0; j < ii.departList.length; j++) {
    //            var jj = busSearchByFeed.busReturn[i].departList[j];
    //            if (jj.segmentNo === 1) {
    //                jj.id = ii.id;
    //            }
    //            jj.travelID = jj.price.listPrice[0].travelID;
    //            jj.accordion = "return";
    //            ii.departList[j] = jj;
    //        }
    //        busReturnTotal.push(ii);
    //    }
    //}

    bindTemplate(ticketSearchByFeed, "#ticketSearchResultTemplate", ".TicketSearchResultsContainer", false);

    activateAdminBSB();
}

function postTicketSearchByFeedAPI(postData, callback) {

    var headers = {};
    headers['XSRF-TOKEN'] = TOKENHEADERVALUE;

    loadComponent(".SearchResultsContainer");

    $.post(busTicketSearchAPI, postData)
        .done(function (response) {
            callback(response);
        })
        .fail(function (jqxhr) {
            $(".SearchResultsContainer").html('<p class="search-message">not found.</p>')
            displayErrors(jqxhr.responseJSON);
            callback(null);
        });
}
function postPrintTicket(id, callback) {
    postPrintTicketByFeedAPI(id, function (data) {

        if (data !== null) {
            callback(true);
            composePrintTicketByFeedIfReady(data);
        } else {
            callback(false);
        }
    });
}
function composePrintTicketByFeedIfReady(data) {
    console.log(data);

    data.contactName = data.data.busPassengers[0].firstName + " " + data.data.busPassengers[0].lastName + " - " + data.data.busPassengers[0].telNumber
    data.departure = data.data.busSearch.departList[0];
    data.departure.departureDate = moment(data.departure.departureDateTime).format('DD/MM/YYYY');

    if (data.data.busSearchReturn != null) {
        data.arrival = data.data.busSearchReturn.departList[0];
        data.arrival.departureDate = moment(data.arrival.departureDateTime).format('DD/MM/YYYY');
    }
    bindTemplate(data, "#printTicketTemplate", ".PrintTicketContainer", false);

}
function postPrintTicketByFeedAPI(id, callback) {

    $.get(busPrintTicketAPI + "/" + id)
        .done(function (response) {
            callback(response);
        })
        .fail(function (jqxhr) {
            //displayErrors(jqxhr.responseJSON);
            callback(null);
        });
}

function postPassengerByFeed(dataToPost, callback) {
    postPassengerByFeedAPI(dataToPost, function (data) {

        if (data !== null) {
            callback(true);
            composePassengerByFeedIfReady(data);
        } else {
            callback(false);
        }
    });
}
function composePassengerByFeedIfReady(data) {
    console.log(data);

}
function postPassengerByFeedAPI(dataToPost, callback) {

    $.post(busPassengerAPI, dataToPost)
        .done(function (response) {
            callback(response);
        })
        .fail(function (jqxhr) {
            displayErrors(jqxhr.responseJSON);
            callback(null);
        });
}
function postBusTicket(postData) {
    postBusTicketByFeedAPI(postData, function (data) {
        composeBusTicketByFeedIfReady(data);
    })
}
function composeBusTicketByFeedIfReady(data) {
    console.log(data);
    if (data.serviceStatus.statusCode == 200) {
        setTimeout(
            function () {
                redirect(rootHost + "passenger/" + data.id);
            }, 250);
    } else {
        bindTemplate(data.serviceStatus, "#busSearchResultMessageTemplate", ".BusSearchResultMessageContainer", false);
    }
}
function postBusTicketByFeedAPI(postData, callback) {
    var headers = {};
    headers['XSRF-TOKEN'] = TOKENHEADERVALUE;

    $.ajax({
        type: "post",
        async: true,
        datatype: 'json',
        headers: headers,
        contentType: 'application/json',
        url: busTicketAPI,
        data: JSON.stringify(postData),
        success: function (data) {
            if (callback !== null) {
                callback(data);
            }
        },
        error: function (error) {
            console.log("Error postBusTicketByFeedAPI()");
        }
    });
}
function postBusUnLockSeat(postData) {
    postBusUnLockSeatByFeedAPI(postData, function (data) {
        composeBusSeatByFeedIfReady(data);
    })
}
function postBusUnLockSeatByFeedAPI(postData, callback) {
    var headers = {};
    headers['XSRF-TOKEN'] = TOKENHEADERVALUE;

    $.ajax({
        type: "post",
        async: true,
        datatype: 'json',
        headers: headers,
        contentType: 'application/json',
        url: busUnLockSeatAPI,
        data: JSON.stringify(postData),
        success: function (data) {
            if (callback !== null) {
                callback(data);
            }
        },
        error: function (error) {
            console.log("Error postBusUnLockSeatByFeedAPI()");
        }
    });
}
function postBusLockSeat(postData) {
    postBusLockSeatByFeedAPI(postData, function (data) {
        composeBusSeatByFeedIfReady(data);
    })
}
function composeBusSeatByFeedIfReady(data) {


    if (currentPanalProvider == 1) {
        seatChecks = data.data.seatDepartChecks;
    } else {
        seatChecks = data.data.seatReturnChecks;
    }

    for (var i = 0; i < seatChecks.length; i++) {
        for (var j = 0; j < data.dataList[0].seatList.length; j++) {
            var jj = data.dataList[0].seatList[j];

            if (seatChecks[i].seatNumber === jj.seatNumber) {
                jj.seatStatus = -1;
                data.dataList[0].seatList[j] = jj;
            }
        }
    }

    console.log(data);
}
function postBusLockSeatByFeedAPI(postData, callback) {
    var headers = {};
    headers['XSRF-TOKEN'] = TOKENHEADERVALUE;

    $.ajax({
        type: "post",
        async: true,
        datatype: 'json',
        headers: headers,
        contentType: 'application/json',
        url: busLockSeatAPI,
        data: JSON.stringify(postData),
        success: function (data) {
            if (callback !== null) {
                callback(data);
            }
        },
        error: function (error) {
            console.log("Error postBusLockSeatByFeedAPI()");
        }
    });
}
function postBusSeatByFeed(postData) {
    postBusSeatByFeedAPI(postData, function (data) {
        busSeatByFeed = data;
        composepostBusSeatByFeedIfReady();
    });
}
function composepostBusSeatByFeedIfReady() {

    if (currentPanalProvider == 1) {
        busSeatByFeed.data.depart = busSeatByFeed.data.busSearch.departList[0];
        if (currentReat != null) {
            $(".BusSeatMapContainer-" + currentReat).html('');
        }
        currentReat = busSeatByFeed.data.depart.id;

    } else {
        busSeatByFeed.data.depart = busSeatByFeed.data.busSearchReturn.departList[0];
        if (currentReatReturn != null) {
            $(".BusSeatMapContainer-" + currentReatReturn).html('');
        }
        currentReatReturn = busSeatByFeed.data.depart.id;
    }

    busSeatByFeed.provider = Number(currentPanalProvider);

    for (var i = 0; i < busSeatByFeed.data.busSeats.length; i++) {
        for (var j = 0; j < busSeatByFeed.data.busSeats[i].seatList.length; j++) {
            var jj = busSeatByFeed.data.busSeats[i].seatList[j];

            jj.provider = Number(currentPanalProvider);
            jj.id = busSeatByFeed.data.depart.id;
            busSeatByFeed.data.busSeats[i].seatList[j] = jj;
        }
    }

    bindTemplate(busSeatByFeed, "#busSeatMapTemplate", ".BusSeatMapContainer-" + busSeatByFeed.data.depart.id, false);
}
function postBusSeatByFeedAPI(postData, callback) {
    var headers = {};
    headers['XSRF-TOKEN'] = TOKENHEADERVALUE;
    $.ajax({
        type: "post",
        async: true,
        datatype: 'json',
        headers: headers,
        contentType: 'application/json',
        url: busSeatAPI,
        data: JSON.stringify(postData),
        success: function (data) {
            if (callback !== null) {
                callback(data);
            }
        },
        error: function (error) {
            console.log("Error postBusSeatByFeedAPI()");
            callback(null);
        }
    });  
}
function postBusSearchByFeed(postData) {
    postBusSearchByFeedAPI(postData, function (data) {
        busSearchByFeed = data["data"];
        composepostBusSearchByFeedIfReady(postData);
    });
}

function composepostBusSearchByFeedIfReady(postData) {
    busDepartTotal = [];
    for (var i = 0; i < busSearchByFeed.busDeparture.length; i++) {

        var ii = busSearchByFeed.busDeparture[i];
        for (var j = 0; j < ii.departList.length; j++) {
            var jj = busSearchByFeed.busDeparture[i].departList[j];
            if (jj.segmentNo === 1) {
                jj.id = ii.id;
            }
            jj.travelID = jj.price.listPrice[0].travelID;
            jj.accordion = "depart";
                ii.departList[j] = jj;
        }

        busDepartTotal.push(ii);
    }

    busReturnTotal = [];
    if (busSearchByFeed.busReturn !== null) {
        for (var i = 0; i < busSearchByFeed.busReturn.length; i++) {
            var ii = busSearchByFeed.busReturn[i];
            for (var j = 0; j < ii.departList.length; j++) {
                var jj = busSearchByFeed.busReturn[i].departList[j];
                if (jj.segmentNo === 1) {
                    jj.id = ii.id;
                }
                jj.travelID = jj.price.listPrice[0].travelID;
                jj.accordion = "return";
                ii.departList[j] = jj;
            }
            busReturnTotal.push(ii);
        }
    }

    bindTemplate(busSearchByFeed, "#busSearchResultTemplate", ".SearchResultsContainer", false);

    bindTemplate({
        dataList: busDepartTotal,
        accordion: 'depart'
    }, "#busSearchDepartResultTemplate", ".busSearchDepartResultContainer", false);

    bindTemplate({
        dataList: busReturnTotal,
        accordion: 'return'
    }, "#busSearchDepartResultTemplate", ".busSearchReturnResultContainer", false);

    activateAdminBSB();
}

function postBusSearchByFeedAPI(postData, callback) {

    var headers = {};
    headers['XSRF-TOKEN'] = TOKENHEADERVALUE;

    loadComponent(".SearchResultsContainer");

    $.post(busSearchAPI, postData)
        .done(function (response) {
            callback(response);
        })
        .fail(function (jqxhr) {
            $(".SearchResultsContainer").html('<p class="search-message">not found.</p>')
            displayErrors(jqxhr.responseJSON);
            callback(null);
        });
}
function postBusFilter(provider) {
    busProvider = provider;
    composeBusFilterByFeedIfReady();
}

function composeBusFilterByFeedIfReady() {

    $(".SearchResultsContainer").html('')

    bindTemplate(
        {
            provider: Number(busProvider)
        }, "#busFilterTemplate", ".BusFilterContainer", false);

    postBusListBoarding(null, null);

    if (busProvider == 1) {
        postBusListBoardingReturn(null, null);

        $('input[name="departureDateReturn"]').daterangepicker({
            singleDatePicker: true,
            showDropdowns: false,
            //minYear: 1901,
            //maxYear: parseInt(moment().format('YYYY'), 10)
        }, function (start, end, label) {

        });
    }

    $('input[name="departureDate"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: false,
        //minYear: 1901,
        //maxYear: parseInt(moment().format('YYYY'), 10)
    }, function (start, end, label) {

    });
    
    activateAdminBSB();
}
function postBusListDropOffReturn(staionId, provinceId, provinceName, stationName) {
    postBusListDropOffByFeedAPI(staionId, provinceId, function (data) {
        busListDropOffReturnByFeed = data;
        composeBusListDropOffReturnByFeedIfReady(staionId, provinceId, provinceName, stationName);
    });
}
function composeBusListDropOffReturnByFeedIfReady(staionId, provinceId, provinceName, stationName) {
        provinceId = busListDropOffReturnByFeed.dataList[0].stationList[0].provinceID;
        staionId = busListDropOffReturnByFeed.dataList[0].stationList[0].stationID;
        var routeList = busListDropOffReturnByFeed.dataList[0].stationList[0].routeList;

    $("#form_busFilter input[name='ToProvinceReturn']").val(provinceId)
    $("#form_busFilter input[name='ToStationReturn']").val(staionId)
    $("#form_busFilter input[name='ToRouteListReturn']").val(routeList)
    $("#form_busFilter input[name='ToProvinceReturnName']").val(provinceName)
    $("#form_busFilter input[name='ToStationReturnName']").val(stationName)

    bindTemplate(busListDropOffReturnByFeed, "#busListDropOffReturnTemplate", ".BusListDropOffReturnContainer", false);
    activateAdminBSB();
}
function postBusListDropOff(staionId, provinceId, provinceName, stationName) {
    postBusListDropOffByFeedAPI(staionId, provinceId, function (data) {
        busListDropOffByFeed = data;
        composeBusListDropOffByFeedIfReady(staionId, provinceId, provinceName, stationName);
    });
}
function composeBusListDropOffByFeedIfReady(staionId, provinceId, provinceName, stationName) {

    provinceId = busListDropOffByFeed.dataList[0].stationList[0].provinceID;
    staionId = busListDropOffByFeed.dataList[0].stationList[0].stationID;
    var routeList = busListDropOffByFeed.dataList[0].stationList[0].routeList;

    $("#form_busFilter input[name='ToRouteList']").val(routeList);
    $("#form_busFilter input[name='ToProvince']").val(provinceId);
    $("#form_busFilter input[name='ToStation']").val(staionId);
    $("#form_busFilter input[name='ToProvinceName']").val(provinceName);
    $("#form_busFilter input[name='ToStationName']").val(stationName);
    bindTemplate(busListDropOffByFeed, "#busListDropOffTemplate", ".BusListDropOffContainer", false);
    activateAdminBSB();
}

function postBusListDropOffByFeedAPI(staionId, provinceId, callback) {
    var headers = {};
    headers['XSRF-TOKEN'] = TOKENHEADERVALUE;

    $.ajax({
        type: "post",
        async: true,
        datatype: 'json',
        headers: headers,
        contentType: 'application/json',
        url: listDropOffAPI,
        data: JSON.stringify({
            language: "th",
            stationID: staionId,
            provinceID: provinceId,
            agent: "GB"
        }),
        success: function (data) {
            if (callback !== null) {
                callback(data);
            }
        },
        error: function (error) {
            console.log("Error postBusListDropOffByFeedAPI()");
        }
    });
}
function postBusListBoardingReturn(province, station, provinceName, stationName) {
    postBusListBoardingByFeedAPI(function (data) {
        busListBoardingReturnByFeed = data;
        composeBusListBoardingReturnByFeedIfReady(province, station, provinceName, stationName);
    });
}
function composeBusListBoardingReturnByFeedIfReady(province, station, provinceName, stationName) {

    if (setUndefined(province) == undefined || setUndefined(station) == undefined) {
        province = busListBoardingReturnByFeed.dataList[0].stationList[0].provinceID;
        station = busListBoardingReturnByFeed.dataList[0].stationList[0].stationID;
        provinceName = busListBoardingReturnByFeed.dataList[0].stationList[0].provinceName;
        stationName = busListBoardingReturnByFeed.dataList[0].stationList[0].stationName;
    }

    $("#form_busFilter input[name='FromProvinceReturn']").val(province);
    $("#form_busFilter input[name='FromStationReturn']").val(station);
    $("#form_busFilter input[name='FromProvinceReturnName']").val(provinceName);
    $("#form_busFilter input[name='FromStationReturnName']").val(stationName);

    var isStop = false;
    for (var i = 0; i < busListBoardingReturnByFeed.dataList.length; i++) {
        var ii = busListBoardingReturnByFeed.dataList[i];

        for (var j = 0; j < ii.stationList.length; j++) {
            var jj = ii.stationList[j];

            if (jj.provinceID == province && jj.stationID == station) {
                if (isStop == false) {
                    jj.isSelected = true;
                    isStop = true;
                }
            } else {
                jj.isSelected = false;
            }
            ii.stationList[j] = jj;
        }

        busListBoardingReturnByFeed.dataList[i] = ii;
    }

    bindTemplate(busListBoardingReturnByFeed, "#busListBoardingReturnTemplate", ".BusListBoardingReturnContainer", false);

    postBusListDropOffReturn(station, province, provinceName, stationName);

    

    activateAdminBSB();
}

function postBusListBoarding(province, station, provinceName, stationName) {
    postBusListBoardingByFeedAPI(function (data) {
        busListBoardingByFeed = data;
        composeBusListBoardingByFeedIfReady(province, station, provinceName, stationName);
    });
}
function composeBusListBoardingByFeedIfReady(province, station, provinceName, stationName) {
    if (setUndefined(province) == undefined || setUndefined(station) == undefined) {
        province = busListBoardingByFeed.dataList[0].stationList[0].provinceID;
        station = busListBoardingByFeed.dataList[0].stationList[0].stationID;
        provinceName = busListBoardingByFeed.dataList[0].stationList[0].provinceName;
        stationName = busListBoardingByFeed.dataList[0].stationList[0].stationName;
    }
    console.log(busListBoardingByFeed);
    $("#form_busFilter input[name='FromProvince']").val(province);
    $("#form_busFilter input[name='FromStation']").val(station);
    $("#form_busFilter input[name='FromProvinceName']").val(provinceName);
    $("#form_busFilter input[name='FromStationName']").val(stationName);

    var isStop = false;
    for (var i = 0; i < busListBoardingByFeed.dataList.length; i++) {
        var ii = busListBoardingByFeed.dataList[i];

        for (var j = 0; j < ii.stationList.length; j++) {
            var jj = ii.stationList[j];

            if (jj.provinceID == province && jj.stationID == station) {
                if (isStop == false) {
                    jj.isSelected = true;
                    isStop = true;
                }
            } else {
                jj.isSelected = false;
            }
            ii.stationList[j] = jj;
        }

        busListBoardingByFeed.dataList[i] = ii;
    }

    bindTemplate(busListBoardingByFeed, "#busListBoardingTemplate", ".BusListBoardingContainer", false);

    postBusListDropOff(station, province, provinceName, stationName);

    

    activateAdminBSB();
}

function postBusListBoardingByFeedAPI(callback) {
    var headers = {};
    headers['XSRF-TOKEN'] = TOKENHEADERVALUE;

    $.ajax({
        type: "post",
        async: true,
        datatype: 'json',
        headers: headers,
        contentType: 'application/json',
        url: listBoardingAPI,
        data: JSON.stringify({
            language: "th"
        }),
        success: function (data) {
            if (callback !== null) {
                callback(data);
            }
        },
        error: function (error) {
            console.log("Error postBusListBoardingByFeedAPI()");
        }
    });
}

