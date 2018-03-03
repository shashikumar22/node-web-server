const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname+'/public'));
app.set('view engine', 'hbs');

app.use((req,res,next) => {
	var now = new Date().toString();
  var log = `${now}: ${req.method}  ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n');
  next();
});

app.use((req,res,next) => {
	res.render('maintenance.hbs');
})

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear();
})

hbs.registerHelper('capitalize', (text) =>{
	return text.toUpperCase();
})

app.get('/', (req, res) => {
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to Home Page '
	});	
})

app.get('/about', (req, res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page'
	});
})

app.get('/bad', (req,res) => {
	res.send({
		errorMessage: 'error message'
	});
})

app.listen(port, () => {
	console.log('connecting to port: '+port);
});