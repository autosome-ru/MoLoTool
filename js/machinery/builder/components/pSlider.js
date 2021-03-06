/**
 * Created by Sing on 07.11.2016.
 * Note that The slider itself is from 0 to 1000 (min, max) but output values are between 0 and 1
 *
 **/
var pSlider = (function () {
    var _initialLogValue = 4,
        _nDigits = {"log": 3, "linear": 3},
        _restrictionValue = {
            "log": {"min": 1.3010, "max": 6},
            "linear":{"min": 0.000001, "max": 0.0500}
        },
        _sliderRange = {"min": [1.3010], "max": [6]},

        _fileName = "pSlider",
                _eventHandler = function() {
            errorHandler.logError({"fileName": _fileName, "message": "_eventHandler hasn't been set"});
        },
        _isActive = false;



    var create = function (eventHandler) {
        setEventHandlerTo(eventHandler);

        var logSlider = setSlider();
        buildUIComponent(logSlider);

        //slider fix for chromium
        var chromeVersion = navigator.userAgent.match(/Chrome\/\d*/),
            versionNumber;
        if (chromeVersion !== null) {
            versionNumber = chromeVersion[0].match(/\d+/)[0];

            if (versionNumber !== null && parseInt(versionNumber) < 52) {
                document.getElementById("log-slider").setAttribute('disabled', true);
                $("#log-slider, .noUi-handle, .noUi-target").css("cursor", "unset");
            }
        }

        console.log(chromeVersion, versionNumber, " - If browser is chrome, version number;");

        return logSlider;
    };


    var setSlider = function() {
        var logSlider = document.getElementById('log-slider');

        noUiSlider.create(logSlider, {
            start: _initialLogValue,
            orientation: "horizontal",
            direction: 'ltr', //left to right
            connect: [true, false],
            behaviour: 'snap',
            range: _sliderRange,
            pips: {
                stepped: false,
                mode: 'values',
                density: 5,
                values: [2, 3, 4, 5, 6]
            }
        });

        /*logSlider.noUiSlider.on('start', function(){
            _isActive = true;
            console.log("START");
        });

        logSlider.noUiSlider.on('end', function(){
            _isActive = false;
            console.log("END");
        });

        logSlider.noUiSlider.on('slide', function(){
            console.log("slide");
        });

        logSlider.noUiSlider.on('update', function(){
            console.log("update");
        });

        logSlider.noUiSlider.on('change', function(){
            console.log('change', this);

        });

        logSlider.noUiSlider.on('set', function(){
            console.log("set");
        });*/

        return logSlider;
    };


    var roundAccordingType = function (value, type, additionalDigits) {
        if (type == "log") {
            return round(value, _nDigits[type] + additionalDigits);
        } else if (type == "linear")
            return parseFloat(value).toExponential(_nDigits[type] - 1);
    };

    var restrictValue = function (value, type) {
        if (value > _restrictionValue[type]["max"])
            return roundAccordingType(_restrictionValue[type]["max"], type, 0);
        else if (value < _restrictionValue[type]["min"])
            return roundAccordingType(_restrictionValue[type]["min"], type, 0);
        else
            return value;
    };

    var roundThenRestrict = function (value, type, additionalDigits) {
        var rounded = roundAccordingType(value, type, additionalDigits);
        return restrictValue(rounded, type);
    };


    var buildUIComponent = function (logSlider) {
        var logValue = document.getElementById('logSlider-input'),
            linearValue = document.getElementById('linearSlider-input');

        //default values
        setDefaultValues();


        logValue.addEventListener('change', function(){
            logValue.value = roundThenRestrict(logValue.value, "log", 0);
            linearValue.value = roundThenRestrict(Math.pow(10, -this.value), "linear", Math.floor(logValue.value));
            logSlider.noUiSlider.set(logValue.value);
            handleEvents();
        });

        linearValue.addEventListener('change', function(){
            linearValue.value = roundThenRestrict(linearValue.value, "linear", Math.floor(-Math.log10(linearValue.value)));
            logValue.value = roundThenRestrict(-Math.log10(linearValue.value), "log", 0);
            logSlider.noUiSlider.set(logValue.value);
            handleEvents();
        });

        logSlider.noUiSlider.on('slide', function( values, handle ) {
            logValue.value = roundThenRestrict(values[handle], "log", 0);
            linearValue.value = roundThenRestrict(Math.pow(10, -values[handle]), "linear", Math.floor(logValue.value));
            handleEvents();
        });
    };


    var setDefaultValues = function () {
        var logValue = document.getElementById('logSlider-input'),
            linearValue = document.getElementById('linearSlider-input'),
            logSlider = document.getElementById('log-slider');

        logSlider.noUiSlider.set(_initialLogValue);
        logValue.value = roundThenRestrict(_initialLogValue, "log", 0);
        linearValue.value = roundThenRestrict(Math.pow(10, -_initialLogValue), "linear", Math.floor(logValue.value));
    };




    var setEventHandlerTo = function (eventHandler) {
        _eventHandler = eventHandler;
    };


    var handleEvents = function () {
        _eventHandler();
    };


    var isActive = function () {
        return _isActive;
    };


    var getPValue = function () {
        return $("#linearSlider-input").val();
    };


    return {
        create: create,
        isActive: isActive,
        getPValue: getPValue,
        setDefaultValues: setDefaultValues
    };

}());