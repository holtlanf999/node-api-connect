//require node modules
var http = require('http'),
fs = require('fs'),
request = require('request'),
jade = require('jade');

// Server initialization...
http.createServer(function (req, res) {
	request('http://swapi.co/api/people/', function (error, response, body) {
		resCheck(res, 'getApi');
		getTpl(JSON.parse(body), res);
	});
}).listen(8000, '127.0.0.1', function (err, res) {
	if(err) return handleError(err, res);
});

// Gets the data from the API...
// function getApi(err, res) {}

// gets html template file...
function getTpl(titles, res) {
	fs.readFile('./template.html', 'utf8', function (err, data) {
		if (err) return handleError(err, data);
		formatHTML(titles, data.toString(), res);
	})
}

// injects content in the html template
function formatHTML(titles, tmpl, res) {
	resCheck(res, 'formatHTML');

	var cont = 0,
    result = titles.results,
    resultLength = result.length,
	tpl = [];

    for (; cont < resultLength; cont++) {
      tpl.push(result[cont].name);
    	var html = tpl.join('</li><li>');
    }

	res.writeHead(200, {'content-Type' : 'text/html'});
	res.end(html);
}

// Checks res state...
function resCheck(res, functionName) {
	if (res !== undefined) {
		var error = console.log('----res Good  ' + functionName);
	} else {
		var error = console.log('----res Error  ' + functionName);
	}
	return error;
}

// Error handler function...
function handleError(err, res) {
	console.log(err);
	res.end('Server Error');
}