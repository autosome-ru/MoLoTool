/**
 * Created by Sing on 12.11.2016.
 */

var errorHandler = (function () {
    var logError = function(error) {
        var errText = "fileName: " + error["fileName"] + "   err: " + error["message"] + "   line: " + error.lineNumber + "\n";
        throw new Error(errText);
    };


    return {
        logError: logError
    };
}());