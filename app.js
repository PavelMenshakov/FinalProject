"use strict";

var express = require('express');
var app = express();
var path = require('path');

app.use('/app', express.static(__dirname + '/app'));
app.use('/lang', express.static(__dirname + '/lang'));
app.use('/data', express.static(__dirname + '/data'));
app.use('/modules', express.static(__dirname + '/bower_components'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});



var dots = [
    {id: 1, x: 10, y:30},
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
    console.log(lastId);
    while(lastId < dots[i].id && i > 0){
        result.unshift(dots[i]);
        i--;
    }
    console.log(result)
    res.json(result);
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


app.listen(3000, function(){
    console.log("app start on 3000 port");
    setInterval(addDot, 2000)
});