//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');



var app = express();

const route = require('./routes/route');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));


//connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/contactlist');

//on connection
mongoose.connection.on('connected',()=>{
	console.log('Connected to database MongoDB @ 27017');
});

mongoose.connection.on('error',(err)=>{
	if (err) {
		console.log('Error to MongoDB connection @ 27017'+err);
	}	
});

//PORT No
const port = 3000;

//adding middleware - cors
app.use(cors());

// parse application/json
app.use(bodyParser.json())

//static files
app.use(express.static(path.join(__dirname,'public')))

//routers
app.use('/api',route);

//testing Server
app.get('/',(req, res)=>{
	res.send('Welcome To NodeJS');
})

app.listen(port,()=>{
	console.log('Server Started at port:'+port);
})