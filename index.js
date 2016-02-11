//require node modules
var http = require('http'),
fs = require('fs'),
request = require('request'),
jade = require('jade');


// request('http://swapi.co/api/people', function (err, res, body) {
//   if (!err && res.statusCode == 200) {

//     var swapi = JSON.parse(body);

//     http.createServer(function (req, res) {

//       if (req.url == '/') {
//         fs.readFile('./template.html', function(err, data) {
//           if (err) {
//               console.err(err);
//               res.end('Server err');
//           } else {
//               var tmpl = data.toString();

//               var makeLi = (function () {
//                 var cont = 0,
//                 result = swapi.results,
//                 resultLength = result.length,
//                 tpl = [];

//                 for (; cont < resultLength; cont++) {
//                   tpl.push(result[cont].name);
//                 	var html = tpl.join('</li><li>');
//                 }

//                 res.writeHead(200, {'Content-Type': 'text/html'});
//                 res.end(html);
//               }());
//           } 
//         });
//       }
//     }).listen(8000, "127.0.0.1");
//   } else {
//     console.log('server error');
//   }
// });


var server = http.createServer(function (req, res) {}).listen(8000, '127.0.0.1', function (err) {
	if(err) return handleError(err, res);
});

function requestApi(res) {
	request('http://swapi.co/api/people', function (err, response, body, res) {
		console.log('line 55 : ' + res);
		getTemplate(err, JSON.parse(body.toString()), res);
	});
}

function getTemplate(err, titles, res) {
	fs.readFile('./template.html', 'utf8', function (err, data, res) {
		if (err) handleError(err, data);
		console.log('line 63 : ' + res);
		formatHTML(titles, data.toString(), res);
	});
}

function formatHTML (titles, tmpl, res) {
	var arr = [];
	for (var prop in titles) {
		arr.push(titles[prop]);
	}
	var html = tmpl.replace('%', arr.join('</li><li>'));
	res.writeHead(200, {'content-Type' : 'text/html'});
	res.end(html);
}

function handleError(err, res) {
	console.log(err);
	res.end('Server error');
}