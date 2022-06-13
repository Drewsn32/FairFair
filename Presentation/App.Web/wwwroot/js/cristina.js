var $l = $('<div class="m-t-10"><div class="preloader pl-size-xs"><div class="spinner-layer pl-teal"><div class="circle-clipper left"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div>');
var $d = $('<div class="row text-center"><div>');
var $delay = 330;

var deleteButton = 'ยืนยันลบข้อมูล';
var deleteMessage = 'แน่ใจไหมว่าต้องการลบข้อมูลนี้<br>หมายเหตุ: ไม่สามารถย้อนกลับ';
var deleteTitle = 'ลบข้อมูล';
var closeButton = "ยกเลิก";
var saveButton = "บันทึก";

$(document).ready(function () {
    $(document).on('changed.bs.select', 'select#listBoarding', function (a) { addListBoarding(this, a); });
    $(document).on('changed.bs.select', 'select#listBoardingReturn', function (a) { addListBoardingReturn(this, a); });
    $(document).on('changed.bs.select', 'select#listDropOff', function (a) { addListDropOff(this, a); });
    $(document).on('changed.bs.select', 'select#listDropOffReturn', function (a) { addListDropOffReturn(this, a); });
    $(document).on('click change', '.triptype input[type="radio"]', function (a) { addTripType(this, a); });
    $(document).on('click', 'a.aBusFilter', function (a) { addBusFilter(this, a, "#form_busFilter"); });
    $(document).on('#tabDeparture shown.bs.collapse', '#tabDeparture .panel-collapse', function (a) { addBusSeatMap(this, a); });
    $(document).on('#tabReturn shown.bs.collapse', '#tabReturn .panel-collapse', function (a) { addBusReturnSeatMap(this, a); });
    $(document).on('click', 'input.aBusSeat', function (a) { addBusSeat(this, a, ""); }); 
    $(document).on('click', 'a.aPanalDeparture', function (a) { addPanalDeparture(this, a); });
    $(document).on('click', 'a.aBusTicket', function (a) { addBusTicket(this, a); });
    $(document).on('click', 'a.aBusPassenger', function (a) { addBusPassenger(this, a, "#form_busPassenger"); });
    $(document).on('click', 'a.aPrintTicket', function (a) { addPrintTicket(this, a); });
    $(document).on('click', 'a.aBusFilterTicket', function (a) { addBusFilterTicket(this, a, "#form_ticketFilter"); });
    $(document).on('click', 'a.aBusCancleTicket', function (a) { addBusCancleTicket(this, a); });
});
function addBusCancleTicket(c, a) {
    a.preventDefault();
    var id = $(c).attr('data-id');

    var dialog = new BootstrapDialog({
        closable: true,
        id: "modalBusFilterRoute",
        closeByBackdrop: false,
        closeByKeyboard: false,
        draggable: false,
        title: $(c).attr('data-title'),
        data: {
            id: $(c).attr('data-ids')
        },
        onshow: function (dialog) {
            dialog.getModalBody().html($d.append($l));

            dialog.getModalFooter().hide();
        },
        onshown: function (dialog) {
            setTimeout(
                function () {
                    //postBusFilterRoute(dialog);
                }, $delay);

        },
        buttons: [{
            id: 'btn-done',
            label: "DONE",
            cssClass: 'btn btn-success btn-lg waves-effect',
            action: function () {

                dialog.close();
            }
        }]
    });

    dialog.realize();
    dialog.getModalHeader().hide();
    dialog.getModalFooter();
    dialog.open();

}

function addBusFilterTicket(c, a, p) {
    a.preventDefault();
    $($(p)).validate({
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        },
        submitHandler: function (form, event) {
            postTicketSearchByFeed($($(p)).serialize(), function (data) {
                if (data === true) {

                }
            })

            event.preventDefault();
            return false;
        },
        invalidHandler: function (event, validator) {
            console.log('invalidHandler');
            //$("#validation-summary-errors").html('');
        }

    });


    $($(p)).submit();
}

function addPrintTicket(c, a, p) {
    a.preventDefault();
    var id = $(c).attr('data-id');

    postPrintTicket(id, function (data) {
        if (data === true) {
            
        }
    })
}
function addBusPassenger(c, a, p) {
    a.preventDefault();
    var id = $(c).attr('data-id');
    $($(p)).validate({
        rules: {
            'policy': {
                required: true
            }
        },
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        },
        submitHandler: function (form, event) {
            postPassengerByFeed($($(p)).serialize(), function (data) {
                if (data === true) {
                    setTimeout(function () {
                        window.location.href = rootHost + "payment/" + id;
                    }, 200);
                }
            })

            event.preventDefault();
            return false;
        },
        invalidHandler: function (event, validator) {
            console.log('invalidHandler');
            //$("#validation-summary-errors").html('');
        }

    });

    $($(p)).submit();
}

function addBusTicket(c, a) {
    var postData = {

    }
    postBusTicket(postData);

}
function addPanalDeparture(c, a) {
    currentPanalProvider = $(c).attr("data-provider");
}
function addPostDataSeat(id) {
    var busDepart = busDepartTotal.find(x => x.id === id);;
    return {
        id: id,
        boardingID: $("#form_busFilter input[name='FromProvince']").val(),
        dropoffID: $("#form_busFilter input[name='FromStation']").val(),
        travelID: busDepart.departList[0].price.listPrice[0].travelID,
        totalseat: Number(busDepart.departList[0].totalseat),
        busTypeCode: busDepart.departList[0].busTypeCode,
        agent: "GB",
        seatProvider: Number(currentPanalProvider)
    }
}

function addPostDataSeatReturn(id) {
    var busDepart = busReturnTotal.find(x => x.id === id);;
    return {
        id: id,
        boardingID: $("#form_busFilter input[name='FromProvinceReturn']").val(),
        dropoffID: $("#form_busFilter input[name='FromStationReturn']").val(),
        travelID: busDepart.departList[0].price.listPrice[0].travelID,
        totalseat: Number(busDepart.departList[0].totalseat),
        busTypeCode: busDepart.departList[0].busTypeCode,
        agent: "GB",
        seatProvider: Number(currentPanalProvider)
    }
}
function addBusSeat(c, a, k) {
    var seatNumber = $(c).attr('data-number');
    var floorIndex = $(c).attr('data-floor');
    var provider = $(c).attr('data-provider');
    var id = $(c).attr('data-id');

    var busDepart = null;
    if (currentPanalProvider == 1) {
        busDepart = addPostDataSeat(id);
    } else {
        busDepart = addPostDataSeatReturn(id);
    }

    var postData = {
        floorIndex: floorIndex,
        seatNumber: seatNumber,
        seatProvider: Number(currentPanalProvider),
        seatRequest: busDepart,
        seatDetailRequest: {
            rowIndex: $(c).attr('data-rowindex'),
            columnIndex: $(c).attr('data-columnindex'),
            typeCode: $(c).attr('data-typecode'),
            typeName: $(c).attr('data-typename'),
            seatNumber: $(c).attr('data-number'),
            seatStatus: $(c).attr('data-seatstatus'),
            classCode: $(c).attr('data-classcode'),
            className: $(c).attr('data-classname'),
            passengerType: $(c).attr('data-passengertype'),
            gender: $(c).attr('data-gender')
        }
    }

    if ($(c).is(":checked")) {
        postBusLockSeat(postData);

    } else {
        console.log('uncheck ' + seatNumber);
    }
}

function addBusReturnSeatMap(c, a) {
    //travel up the DOM to the heading and check the radio
    $('#tabReturn .panel-heading').find('input').prop("checked", false);
    $(c).prev('#tabReturn .panel-heading').find('input').prop("checked", true);
    var current = $("#tabReturn .panel-heading input[type='radio']:checked");

    var totalSeat = current.attr("data-total");
    var boardingID = $("#form_busFilter input[name='FromProvinceReturn']").val();
    var dropoffID = $("#form_busFilter input[name='FromStationReturn']").val();
    var travelID = current.attr("data-travel");
    var agent = current.attr("data-agent");
    var busTypeCode = current.attr("data-type");
    var tripType = $("input[type='radio'][name='radtriptype']:checked").val();
    var depReturnTime = $("#form_busFilter select[name='DepartureTimeReturn'] option:selected").val();
    var depTime = $("#form_busFilter select[name='DepartureTime'] option:selected").val();
    var id = current.val();

    var busDepart = busDepartTotal.find(x => x.id === id);
    var busReturn = busReturnTotal.find(x => x.id === id);

    if (busReturn === undefined) {
        busReturn = null;
    }
    var postData = {
        boardingID: boardingID,
        dropoffID: dropoffID,
        travelID: travelID,
        totalseat: Number(totalSeat),
        busTypeCode: busTypeCode,
        agent: "GB",
        SeatProvider: Number(currentPanalProvider),
        busSearch: busDepart,
        tripType: Number(tripType),
        busSearchReturn: busReturn,
        busSearchRequest: {
            departureTimeReturn: depReturnTime,
            departureTime: depTime,
            departureDate: $("#form_busFilter input[name='departureDate']").val(),
            departureDateReturn: $("#form_busFilter input[name='departureDateReturn']").val(),
            TripType: Number($("#form_busFilter input[name='TripType']").val()),
            ToRouteListReturn: $("#form_busFilter input[name='ToRouteListReturn']").val(),
            ToStationReturn: $("#form_busFilter input[name='ToStationReturn']").val(),
            ToProvinceReturn: $("#form_busFilter input[name='ToProvinceReturn']").val(),
            ToProvince: $("#form_busFilter input[name='ToProvince']").val(),
            ToRouteList: $("#form_busFilter input[name='ToRouteList']").val(),
            ToStation: $("#form_busFilter input[name='ToStation']").val(),
            FromProvince: $("#form_busFilter input[name='FromProvince']").val(),
            FromStation: $("#form_busFilter input[name='FromStation']").val(),
            FromProvinceReturn: $("#form_busFilter input[name='FromProvinceReturn']").val(),
            FromStationReturn: $("#form_busFilter input[name='FromStationReturn']").val(),
        }
    }
    postBusSeatByFeed(postData);
}

function addBusSeatMap(c, a) {
    //travel up the DOM to the heading and check the radio
    $('#tabDeparture .panel-heading').find('input').prop("checked", false);
    $(c).prev('#tabDeparture .panel-heading').find('input').prop("checked", true);
    var current = $("#tabDeparture .panel-heading input[type='radio']:checked");

    var totalSeat = current.attr("data-total");
    var boardingID = $("#form_busFilter input[name='FromProvince']").val();
    var dropoffID = $("#form_busFilter input[name='ToProvince']").val();
    var travelID = current.attr("data-travel");
    var agent = current.attr("data-agent");
    var busTypeCode = current.attr("data-type");
    var id = current.val();
    var tripType = $("input[type='radio'][name='radtriptype']:checked").val();

    var depReturnTime = $("#form_busFilter select[name='DepartureTimeReturn'] option:selected").val();
    var depTime = $("#form_busFilter select[name='DepartureTime'] option:selected").val();
    console.log(depTime);
    var busDepart = busDepartTotal.find(x => x.id === id);
    var busReturn = busReturnTotal.find(x => x.id === id);

    if (busReturn === undefined) {
        busReturn = null;
    }
    var postData = {
        boardingID: boardingID,
        dropoffID: dropoffID,
        travelID: travelID,
        totalseat: Number(totalSeat),
        busTypeCode: busTypeCode,
        agent: "GB",
        SeatProvider: Number(currentPanalProvider),
        busSearch: busDepart,
        busSearchReturn: busReturn,
        tripType: Number(tripType),
        busSearchRequest: {
            departureTimeReturn: depReturnTime,
            departureTime: depTime,
            departureDate: $("#form_busFilter input[name='departureDate']").val(),
            departureDateReturn: $("#form_busFilter input[name='departureDateReturn']").val(),
            TripType: Number($("#form_busFilter input[name='TripType']").val()),
            ToRouteListReturn: $("#form_busFilter input[name='ToRouteListReturn']").val(),
            ToStationReturn: $("#form_busFilter input[name='ToStationReturn']").val(),
            ToProvinceReturn: $("#form_busFilter input[name='ToProvinceReturn']").val(),
            ToProvince: $("#form_busFilter input[name='ToProvince']").val(),
            ToRouteList: $("#form_busFilter input[name='ToRouteList']").val(),
            ToStation: $("#form_busFilter input[name='ToStation']").val(),
            FromProvince: $("#form_busFilter input[name='FromProvince']").val(),
            FromStation: $("#form_busFilter input[name='FromStation']").val(),
            FromProvinceReturn: $("#form_busFilter input[name='FromProvinceReturn']").val(),
            FromStationReturn: $("#form_busFilter input[name='FromStationReturn']").val(),
        }
    }
    console.log(postData);

    postBusSeatByFeed(postData);
}
function addListDropOffReturn(c, a) {
    var dataTypeAttribute = $('option:selected', c).attr("data-id");
    var routeList = $('option:selected', c).attr("data-route");
    var province = $('option:selected', c).attr("data-province");
    var station = $('option:selected', c).attr("data-station");

    $("#form_busFilter input[name='ToStationReturnName']").val(station)
    $("#form_busFilter input[name='ToProvinceReturnName']").val(province)
    $("#form_busFilter input[name='ToRouteListReturn']").val(routeList)
    $("#form_busFilter input[name='ToProvinceReturn']").val(dataTypeAttribute)
    $("#form_busFilter input[name='ToStationReturn']").val(c.value)
}
function addListDropOff(c, a) {
    var dataTypeAttribute = $('option:selected', c).attr("data-id");
    var routeList = $('option:selected', c).attr("data-route");
    var province = $('option:selected', c).attr("data-province");
    var station = $('option:selected', c).attr("data-station");

    $("#form_busFilter input[name='ToStationName']").val(station)
    $("#form_busFilter input[name='ToProvinceName']").val(province)
    $("#form_busFilter input[name='ToRouteList']").val(routeList)
    $("#form_busFilter input[name='ToProvince']").val(dataTypeAttribute)
    $("#form_busFilter input[name='ToStation']").val(c.value)

}
function addBusFilter(c, a, p) {
    a.preventDefault();
    $($(p)).validate({
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        },
        submitHandler: function (form, event) {
            postBusSearchByFeed($($(p)).serialize(), function (data) {
                if (data === true) {
                   
                }
            })
            
            event.preventDefault();
            return false;
        },
        invalidHandler: function (event, validator) {
            console.log('invalidHandler');
            //$("#validation-summary-errors").html('');
        }

    });


    $($(p)).submit();
}

function addTripType(c, a) {
    postBusFilter(c.value);
}
function addListBoardingReturn(c, a) {
    var dataTypeAttribute = $('option:selected', c).attr("data-id");
    var province = $('option:selected', c).attr("data-province");
    var station = $('option:selected', c).attr("data-station");
    postBusListBoardingReturn(dataTypeAttribute, c.value, province, station);
}
function addListBoarding(c, a) {
    var dataTypeAttribute = $('option:selected', c).attr("data-id");
    var province = $('option:selected', c).attr("data-province");
    var station = $('option:selected', c).attr("data-station");
    postBusListBoarding(dataTypeAttribute, c.value, province, station);
}

function activateModelBody(template, dialog, showFooter) {
    $("#validation-summary-errors").html('');
    $("#validation-summary-errors-modal").html('');

    dialog.getModalBody().css('padding', '0').html(template);

    if (showFooter === false) {
        dialog.getModalFooter().hide();
    } else {
        dialog.getModalFooter().show();
    }
    activateAdminBSB();
}
function activateAdminBSB() {
    $.AdminBSB.dropdownMenu.activate();
    $.AdminBSB.input.activate();
    $.AdminBSB.select.activate();
}
function setUndefined(e) {
    if (e === undefined || e === 'undefined' || e === null || e === '') {
        return undefined;
    } else {
        return e;
    };
}
function redirect(url) {
    var ua = navigator.userAgent.toLowerCase(),
        isIE = ua.indexOf('msie') !== -1,
        version = parseInt(ua.substr(4, 2), 10);

    // Internet Explorer 8 and lower
    if (isIE && version < 9) {
        var link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click();
    }

    // All other browsers can use the standard window.location.href (they don't lose HTTP_REFERER like Internet Explorer 8 & lower does)
    else {
        window.location.href = url;
    }
}

function displayErrors(errors) {

    console.log(errors);
    var errList = "";
    for (var i = 0; i < errors.length; i++) {
        errList += "<li>" + errors[i].Value + "</li>";
    }
    $("#validation-summary-errors").html("<div class='validation-summary-errors alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>×</span></button><strong><i class='material-icons'>error</i> <span style='vertical-align: super;'>Oh snap!</span></strong><ul>" + errList + "</ul></div>");

    //if ($('#validation-summary-errors-modal').attr('id') !== undefined) {
    //    $("#validation-summary-errors-modal").html("<div class='validation-summary-errors alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>×</span></button><strong><i class='material-icons'>error</i> <span style='vertical-align: super;'>Oh snap!</span></strong><ul>" + errList + "</ul></div>");

    //} else {
    //    $("#validation-summary-errors").html("<div class='validation-summary-errors alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>×</span></button><strong><i class='material-icons'>error</i> <span style='vertical-align: super;'>Oh snap!</span></strong><ul>" + errList + "</ul></div>");
    //}

}
function toSeoUrl(url) {
    return url.toString()               // Convert to string
        .normalize('NFD')               // Change diacritics
        //.replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
        .replace(/\s+/g, '-')            // Change whitespace to dashes
        .toLowerCase()                  // Change to lowercase
        //.replace(/&/g, '-and-')          // Replace ampersand
        .replace(/,/g, '_')          // Replace ampersand
    //.replace(/[^a-z0-9\-]/g, '')     // Remove anything that is not a letter, number or dash
    //.replace(/-+/g, '-')             // Remove duplicate dashes
    //.replace(/^-*/, '')              // Remove starting dashes
    //.replace(/-*$/, '');             // Remove trailing dashes
}
function loadComponent(className) {
    $(className).html('<div class="hr-line-x-small"></div><div class="preloader pl-size-l"><div class="spinner-layer pl-red-grey"><div class="circle-clipper left"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>')
}
function load() {
    setTimeout(function () {
        $('.page-loader-wrapper').fadeIn();
    }, 5);
    $("html, body").animate({ scrollTop: 0 }, 5);
}
function unload() {
    setTimeout(function () {
        $('.page-loader-wrapper').fadeOut();
    }, 5);
    $("html, body").animate({ scrollTop: 0 }, 5);
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function diff(start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0)
        hours = hours + 24;

    return (hours <= 9 ? "0" : "") + hours + "h " + (minutes <= 9 ? "0" : "") + minutes + "m";
}
function find(arr, test, ctx) {
    var result = null;
    arr.some(function (el, i) {
        return test.call(ctx, el, i, arr) ? ((result = el), true) : false;
    });
    return result;
}
function toSeoUrl(url) {
    return url.toString()               // Convert to string
        .normalize('NFD')               // Change diacritics
        //.replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
        .replace(/\s+/g, '-')            // Change whitespace to dashes
        .toLowerCase()                  // Change to lowercase
        //.replace(/&/g, '-and-')          // Replace ampersand
        .replace(/,/g, '_')          // Replace ampersand
    //.replace(/[^a-z0-9\-]/g, '')     // Remove anything that is not a letter, number or dash
    //.replace(/-+/g, '-')             // Remove duplicate dashes
    //.replace(/^-*/, '')              // Remove starting dashes
    //.replace(/-*$/, '');             // Remove trailing dashes
}
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1].split('_');
        }
    }
}
function removeURLParameter(url, parameter) {
    //prefer to use l.search if you have a location/link object
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    }
    return url;
}
function activateValidate() {
    $.validator.addMethod('emailonly', function (value, element) {
        return value.match("^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$");
    }, 'Please type in Email only.');
}

function modalMessage(message) {
    var dialog = new BootstrapDialog({
        closable: true,
        id: "modalMessage",
        closeByBackdrop: false,
        closeByKeyboard: false,
        draggable: false,
        title: message,
        onshow: function (dialog) {
            dialog.getModalBody().html('');
             //dialog.getModalBody().html($d.append($l));
            dialog.getModalFooter().hide();
        },
        onshown: function (dialog) {
            dialog.getModalBody().html('');
        },
        buttons: [{
            label: "CLOSE",
            cssClass: 'btn btn-danger btn-lg waves-effect',
            action: function (dialog) {
                dialog.close();
            }
        }]
    });

    dialog.realize();
    dialog.getModalHeader();
    dialog.getModalFooter();
    dialog.open();
}