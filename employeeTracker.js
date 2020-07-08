const mysql = require("mysql");
const inquirer = require("inquirer");
const { connected } = require("process");

var connection = mysql.createConnection({
    host: "localhost",

    // establish a port default my mysql
    port: 3306,

    // adding my username
    user: "root"
    // adding my  password
    password: "password"
    
    database: "employeeTracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    createProduct();
});