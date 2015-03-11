var serveStatic = require('serve-static');
var connect = require('connect');
var http = require('http');
var finalhandler = require('finalhandler');

var app = connect();

var serve = serveStatic('web', {'index': ['index.html', 'index.htm']});

var server = http.createServer(function(req, res){
    var done = finalhandler(req, res);
    serve(req, res, done)
});

server.listen(3000);