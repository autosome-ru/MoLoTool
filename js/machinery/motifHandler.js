/**
 * Created by HOME on 24.01.2017.
 */

var motifHandler = (function () {
    var _fileName = "motifHandler",
        _motifNameList = [];

    var setup = function (motifNameList) {
        //Todo
    };
    
    
    var handleMotifs = function () {
        //ToDo: add pValue into inputParsing
        var sequence = inputParsing.parseInput()[0]["sequence"], title = inputParsing.parseInput()[0]["title"],
            pValue = $("#linearSlider-input").val(),
            sites = [];

        if (globalMotifLibrary["allMotifsSaved"] != true) {
            errorHandler.logError({"fileName": _fileName, "message": "allMotifsSaved is false WTF is that!?"});
            return 0;
        } else {
            for(var i = 0; i < globalMotifLibrary["motifs"].length; i++) {
                motif.setMotifValues(globalMotifLibrary["motifs"][i]);
                sites = sites.concat(motif.findSitesInSequence(sequence, pValue));
            }
            console.log(sites);
            if (sites.length != 0 ) {
                sites["title"] = title;
                motifTable.redrawTableWithSites(sites);
            }

            motifTable.redrawTableWithSites(sites);
            $('#result').html(markupSegmentation(sequence, sites));
        }
    };


    return {
        handleMotifs: handleMotifs
    };

}());