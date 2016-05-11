var express = require("express");
var app = express();
var path = require("path");
var moment = require("moment");

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
  res.end();
});

app.get('/:time', function(req,res){
  var unixtime, date, naturaldate;
  if (Number.isInteger(+req.params.time)){
    unixtime = +req.params.time;
    date = moment(unixtime * 1000);
  } else {
    date = moment(req.params.time);
    unixtime = date.format('x') / 1000;
  }
   
  naturaldate = date.format('MMMM DD, YYYY');
  
  if (!date._isValid) {
    unixtime = null;
    naturaldate = null;
  }
  
  var result = {
    unix: unixtime,
    natural: naturaldate
  }
  res.end(JSON.stringify(result));
});

app.listen(process.env.PORT || 8080, function(err,log){
  if (err) throw err;
  console.log('Server running on port: '+ process.env.PORT);
});