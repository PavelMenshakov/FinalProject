"use strict";

var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');


app.use(favicon(__dirname + '/app/css/img/favicon.ico'));
app.use('/app', express.static(__dirname + '/app'));
app.use('/lang', express.static(__dirname + '/lang'));
app.use('/data', express.static(__dirname + '/data'));
app.use('/modules', express.static(__dirname + '/bower_components'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

var serverInstance = {
    app: app
};
var appListen = app.listen;
app.listen = function() {
    return serverInstance.http = appListen.apply(this, arguments);
};


var dots = [
    {id: 1, x: 10, y:30}
];

var addDot = function(){
    dots.push({
        id: dots[dots.length-1].id + 1,
        x: dots[dots.length-1].x + Math.random() * (10 - 1) + 1,
        y: Math.random().toFixed(2) * (100 - 10) + 10
    });
};

app.get('/api/dots', function(req, res) {
    var lastId = req.param('id'), i = dots.length- 1, result = [];

    while(lastId < dots[i].id && i > 0){
        result.unshift(dots[i]);
        i--;
    }
    res.json(result);
});

app.get('/api/auth', function(req, res) {
    var user = req.param('name'),
        users = {
            "user1" : "24c9e15e52afc47c225b757e7bee1f9d",
            "user2" : "7e58d63b60197ceb55a1c487989a3720",
            "user3" : "92877af70a45fd6a2ed7fe81e1236b78"
        };


    res.json(users[user] || false);
});

app.get('/api/users', function(req, res) {
    var user = req.param('name'),
        users = {
            "user1" : {
                "name": "user1",
                "email": "userone@epam.com",
                "birthday": "01-01-02",
                "age": 25
            },
            "user2" : {
                "name": "user2",
                "email": "usertwo@epam.com",
                "birthday": "01-01-02",
                "age": 19
            },
            "user3" : {
                "name": "user3",
                "email": "userthree@epam.com",
                "birthday": "01-01-02",
                "age": 29
            }
        };


    res.json(users[user] || false);
});

app.get('/api/tree',function(req,res){
    var data = {
        "name": "root",
        "children": [
            {
                "name": "Node 1",
                "opened": "true",
                "children": [
                    {
                        "name": "Subnode 1-1"
                    },
                    {
                        "name": "Subnode 1-2",
                        "opened": true,
                        "children": [
                            {
                                "name": "Subnode 1-2-1",
                                "opened": true,
                                "children": [
                                    {
                                        "name": "Subnode 1-2-1-1"
                                    },
                                    {
                                        "name": "Subnode 1-2-1-2"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Node 2",
                "children": [
                    {
                        "name": "Subnode 2-1",
                        "children": []
                    },
                    {
                        "name": "Subnode 2-2",
                        "opened": true,
                        "children": [
                            {
                                "name": "Subnode 2-2-1",
                                "children": [
                                    {
                                        "name": "Subnode 2-2-1-1",
                                        "children": []
                                    },
                                    {
                                        "name": "Subnode 2-2-1-2",
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    res.json(data);
});

app.listen(3000);

console.log('3000 port');

module.exports = serverInstance;