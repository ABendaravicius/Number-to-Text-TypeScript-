"use strict";
exports.__esModule = true;
function convertNumberToEnglishText(n) {
    var nAbs = Math.abs(n);
    var nTxt = nAbs.toString();
    var numAsTxt = '';
    // Helper functions
    function digit(idx) {
        return parseInt(nTxt[idx]);
    }
    function checkToContinue(arg) {
        var remain = parseInt(nTxt.slice(arg));
        if (remain != 0) {
            numAsTxt += ' ' + convertNumberToEnglishText(remain);
        }
    }
    // Check if number is integer
    if (!Number.isInteger(n))
        return 'Number is not an integer!';
    // Checking if number does not exceed maximum digit count (5 digits or less)
    if (nTxt.length > 5)
        return 'The number exceeds maximum digit count.';
    /* Array holding Units
        first element in array represents zero */
    var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    /* Array holding Tens
        first element in array represents zero
        second element in array represents ten */
    var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    if (n === 0)
        return 'zero'; // Case of n value = 0
    if (n < 0)
        numAsTxt += 'negative '; // Check if number is negative/positive
    switch (nTxt.length) {
        case 1: // Case for one-digit numbers
            numAsTxt += units[nAbs];
            break;
        case 2: // Case for two-digit numbers
            if (nAbs < 20) { // Case for n values [-19,-1; 1,19]
                numAsTxt += units[nAbs];
            }
            else {
                numAsTxt += tens[digit(0)];
                if (digit(1) != 0)
                    numAsTxt += ' ' + units[digit(1)];
            }
            break;
        case 3: // Case for three-digit numbers
            numAsTxt += units[digit(0)] + ' hundred';
            checkToContinue(1);
            break;
        case 4: // Case for four-digit numbers
            numAsTxt += units[digit(0)] + ' thousand';
            checkToContinue(1);
            break;
        case 5: // Case for five-digit numbers
            numAsTxt += convertNumberToEnglishText(parseInt(nTxt.slice(0, 2))) + ' thousand';
            checkToContinue(2);
            break;
    }
    if (numAsTxt.endsWith(' '))
        numAsTxt = numAsTxt.slice(0, -1);
    return numAsTxt;
}
exports.convertNumberToEnglishText = convertNumberToEnglishText;
