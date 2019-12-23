var sqlite3 = require('sqlite3').verbose()
var bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(express.static('public'));
app.set('view engine', 'pug')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

var db = new sqlite3.Database('twitter.db');
var account = 'mob1';

app.get('/', function (req, res, next) {
    var query = "\
        SELECT t.account, u.name, t.datetime, t.content\
        FROM tweet t, follow f, user u\
        WHERE t.account = u.account and f.follower_account = 'mob1' and f.followee_account = t.account;\
        ";
        console.log("DBG:" + query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
            results: rows
        })
    });
    next;
});

app.post('/tweet', function (req, res, next) {

    for (key in req.body) {
        console.log(key, '=', req.body[key]); // コンソール出力
    }

    datetime = getCurrentTime();
    content = req.body['tweet_content'];
    var query = "INSERT INTO tweet(account,datetime,content) VALUES(?,?,?)";
    var statement = db.prepare(query);
    statement.run(account,datetime,content);
    statement.finalize();
    
    res.redirect('/');    
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

function getCurrentTime() {
	var now = new Date();
	var res = "" + now.getFullYear() + "/" + padZero(now.getMonth() + 1) + 
		"/" + padZero(now.getDate()) + " " + padZero(now.getHours()) + ":" + 
		padZero(now.getMinutes()) + ":" + padZero(now.getSeconds());
	return res;
}

function padZero(num) {
	var result;
	if (num < 10) {
		result = "0" + num;
	} else {
		result = "" + num;
	}
	return result;
}