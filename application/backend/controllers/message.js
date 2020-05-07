const models = require('../models');

const { Message } = models;
const express = require('express');
//const server = require("http").Server(express);
//const io = require("socket.io").listen(server);

// users = [];
// connections = [];
// const io = require('../config/socketManager')
const io = require('../server.js').io

module.exports = function(socket) {
    //console.log(req);
    // io.on('connection', function (socket) {
    //     connections.push(socket);
    //     console.log('Connected: %s users connected', connections.length);
    // });
    console.log("Socket ID: " + socket);
}