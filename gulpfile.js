var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
var http = require('http').Server(app);
var path = require('path');
var gulp_task = require('./Server/task');
var Server = new gulp_task(app, http);
var bodyParser = require('body-parser');
var port = 4000;



// app.set('views', path.join(__dirname, 'ui'));
// // app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'sass')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/css', function(req, res){
  res.sendFile(__dirname + '/css/main.css');
});





Server.start(port);



