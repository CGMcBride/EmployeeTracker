const mysql = require("mysql");
const inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",

    // establish a port default my mysql
    port: 3306,

    // adding my username
    user: "root",
    // adding my  password
    password: "password",

    database: "employeeTracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    createProduct();
});

function processQuestions(questions) {
    inquirer.prompt("Would you like to add a employee, role or department?", questions)

    const questions = [
        {
            message: "What's your employee first name?",
            type: "input",
            name: "firstName",
            // validate: validateName
        }, {
            message: "What's your employee last name?",
            type: "input",
            name: "lastName",
            // validate: validateName
        }, {
            message: "What is your role?",
            type: "input",
            name: "role",
        }, {
            message: "Who is your manager?",
            type: "input",
            name: "manager",
        }, {
            message: "What is your title?",
            type: "input",
            name: "title",
        }, {
            message: "What is your salary?",
            type: "input",
            name: "salary",
        }, {
            message: "What is your department id?"
            type: "input",
            name: "id"
        }

    ];
}

processQuestions()