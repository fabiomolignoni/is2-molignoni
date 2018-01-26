const express = require('express'),
    bodyParser = require('body-parser'),
    checker = require('./checker');

const app = express();
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));



app.post('/check', function (req, res) {
    res.status(200)
    console.log(req.body)
    console.log(req.body.invocationParameters)
    return checker(req.body.url, req.body.invocationParameters, req.body.expectedResultData, req.body.expectedResultStatus).then(function (risultato) {
        return res.json(risultato)
    })

})


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
