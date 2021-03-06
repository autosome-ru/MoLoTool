var showTableButton = (function () {
    var getSettingsFor = {
            "disabled": {"title":"Show table ", "icon": "visibility"},
            "active":   {"title":"Hide table ", "icon": "visibility_off"}
        },
        defaultMode = "active",

        $button,
        $target,
        $interface;


    var switchMode = function () {
        var newMode = ($target.hasClass("disabled")) ? "active" : "disabled";
        if (newMode === "disabled") {
            $target.addClass("disabled");
            uiButtons.handleEvent("clearTable");
        } else {
            $target.removeClass("disabled");
            uiButtons.handleEvent();
        }

        $button
            .empty()
            .html(uiButtons.generateContent(getSettingsFor[newMode]));

        return newMode;
    };


    var init = function () {
        $button = $("#open-table-button");
        $target = $("#motif-table-cmp");
        $interface = $(".interface-area");

        if (defaultMode === "disabled") {
            $target.addClass("disabled");
        } else {
            $target.removeClass("disabled");
        }

        $button
            .empty()
            .html(uiButtons.generateContent(getSettingsFor[defaultMode]))
            .on('click', function(event) {
                event.preventDefault();
                if ($interface.hasClass("hidden")) {
                    homeButton.switchMode();
                } else {
                    switchMode();
                }
            });
    };

    var reset = function () {
        var newMode = ($target.hasClass("disabled")) ? "active" : "disabled";
        if (newMode === defaultMode) {
            switchMode();
        }
    };

    return {
        init: init,
        reset: reset
    };
} ());
