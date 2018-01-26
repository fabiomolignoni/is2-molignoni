const fetch = require('node-fetch')


function check(url, invocationParameters, expectedResultData, expectedResultStatus) {
    url += '?'
    var notFirst = false
    for (var key in invocationParameters) {
        if (!notFirst) {
            url += '&'
        }
        if (invocationParameters.hasOwnProperty(key)) {
            var val = invocationParameters[key]
            url += (key + '=' + val)
        }
    }
    const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }
    console.log(url)
    return fetch(url).then(function (response) {
        checkResult.resultStatus = response.status
        checkResult.statusTestPassed = (response.status === expectedResultStatus)
        return response.json()
    }).then(function (json) {
        checkResult.resultData = json
        checkResult.resultDataAsExpected = compareResults(json, expectedResultData)
        return checkResult
    }).catch(function (error) {
        console.log('Unexpected error', error)
        return checkResult // ritorno di default checkResult, i campi che non sono stati calcolati saranno comunque null
    })
}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e] === undefined || expected[e] != actual[e]) return false
    }
    return true
}

module.exports = check
