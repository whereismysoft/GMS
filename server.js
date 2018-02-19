var express = require('express');
var parse = require('csv-parse');
var path = require('path');
var fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/static'));

app.route('/')
	.get(function(req, res) {
		res.sendFile(path.join(__dirname+'/index.html'))
	});

var myArr = [];

app.route('/header')
	.get(function(req, res) {
		fs.readFile('titanic.csv', function(err, fileData) {
    		parse(fileData, {from: 1, to: 1}, function(err, rows) {
      			res.send(rows);
    		});
  		});
	});

app.route('/data')
	.get(function(req, res) {
		fs.readFile('titanic.csv', function(err, fileData) {
    		parse(fileData, {from: 2}, function(err, rows) {
      			res.send(Array.from(rows));
    		});
  		});
	});


app.listen(3000, function() {
	console.log('server listening on port 3000')
})