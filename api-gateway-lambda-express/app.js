require('dotenv').config();

const express = require('express')
//const session = require('express-session')

const path = require('path')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
//const compression = require('compression')
const ejs = require('ejs')
//const pug = require('pug')


const app = express();

    app.set('view engine', 'ejs');//tell Express we're using EJS
    app.set('views',__dirname + '/views');
    app.engine('html', ejs.renderFile);

    //app.use(compression());
    app.use(cors());
    app.use(cookieParser());


    //=================================================
    //app.use(bodyParser.urlencoded({ extended: true }));
    //app.use(bodyParser.json());

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit:50000
    }));





/*
Cookie

	app.use(session({
		secret: '250624-0U812-90125-5150-1984',
		//cookie: { maxAge: 60000 }, //this causes problems with safari
		cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
		resave: false,
		saveUninitialized: true
	}));

*/
	


    //===============================================

    app.use(express.static(path.join(__dirname, 'public')));
    //app.use(express.static(path.join(__dirname, 'public'),{ maxAge: 86400000 }));

    //app.use(express.static(__dirname + '/public'));
    //app.use(express.static(__dirname + 'public', { maxAge: 86400000 }));
    //app.use('/app1', express.static(path.join(__dirname, 'public')));


    //===============================================
    app.use(function (req, res, next) {


        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');

        //res.header('Cache-Control', 'max-age=2592000');
        //res.header('Expires', '-1');
        //res.header('Pragma', 'no-cache');

        next();
    });




/*

//#############################################
//SERVER

const PORT_NUM = 5000;

//http.createServer(app).listen(3000);

var server = app.listen(PORT_NUM, function () {

    var host = server.address().address;
    var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

*/

//#############################################
//SERVERLESS

module.exports = app;






//##############################################################################
//##############################################################################
//APP REQUIRES



//#############################################
//ROUTER 

require('./router/wildcard.js')(app);
//require('./router/curl')(app);



//#############################################
//PROCESS

require('./process/TestAjax.js')(app);
require('./process/FetchPageData.js')(app);




