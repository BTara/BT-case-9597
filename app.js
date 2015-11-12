var port = 3000;
var fileName = 'data.json';

var express = require("express");
var url = require('url');
var fs = require('fs');

var redis = require('redis');

var app = express();

app.get('/track', function (req, res) {

  var client = redis.createClient(6379,'127.0.0.1',{no_ready_check:true}); // change credentials if needed
  connectToDB(client);

	var counter = parseInt(req.query.counter);

  if(!isNaN(counter))
  {  
    DBsaveData(client,counter);
  }else{
    res.send('counter not available');
  }

  JSONsaveData(req.query,fileName);

  res.end();


});

app.listen(port);

function JSONsaveData(data,fileName)
{
  if(isFileExists(fileName))
  {

    ///
    /// append JSON here
    ///
  }else
  {
    console.log('not exist, creating');
    fs.writeFile(fileName,JSON.stringify(data,null,4),function(err)
    {
        if(err)
        {
            console.log(err);
        }else
        {
          console.log('saved');
        }
    });
  }
}

function isFileExists(fileName)
{
  try
  {
    return fs.statSync(fileName).isFile();
  }catch(err)
  {
    return false;
  }
}

function connectToDB(client)
{
  
  client.auth('pw',function(err) { if(err) console.log(err)});
  client.on('connect',function(){console.log('connected')});
}

function DBsaveData(client,counter)
{
  client.get("counter",function(err,reply)
      {
        counter += parseInt(reply);
      });
  client.set("counter",counter);
}