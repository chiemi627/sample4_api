var sqlite3 = require('sqlite3').verbose()
const express = require('express')
const app = express()
app.use(express.static('public'));
app.set('view engine', 'pug')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(urlencodedParser);
app.use(bodyParser.json());

var db = new sqlite3.Database('twitter.db');
var account = 'mob1';

app.get('/', function (req, res, next) {
    var query = "\
        SELECT t.account, u.name, t.datetime, t.content,\
               (SELECT count(*) FROM favorite WHERE tweet_id=t.id) as fav_count, \
               (SELECT count(*) FROM tweet t2 WHERE retweeted_id=t.id) as ret_count \
        FROM tweet t, user u\
        WHERE ( t.account = '"+account+"' \
          or  t.account IN (SELECT f.followee_account \
                             FROM follow f \
                             WHERE f.follower_account = '"+account+"')) \
          and t.account = u.account \
        ORDER BY t.datetime desc; \
        ";
    console.log(query);
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