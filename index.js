const mysql = require("mysql");
const inquirer = require("inquirer");


const connection = mysql.createConnection({
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
    processQuestions();
});

function processQuestions() {
    inquirer.prompt({
        message: "Would you like to add information?",
        type: "list",
        name: "question",
        choices: ["Add departments", "View departments", "Add roles", "View roles", "Add employees", "View employees", "Update employee role"]

    }).then(function (answers) {
        console.log(answers)
        switch (answers.question) {
            case "Add departments":
                addDepartment();
                break;
            case "Add roles":
                addRoles();
                break;
            case "Add employees":
                addEmployees();
                break;
            case "View departments":
                viewDepartments();
                break;
            case "View roles":
                viewRoles();
                break;
            case "View employees":
                viewEmployees();
                break;
            case "Update employee role":
                updateEmployee();
                break;
            default:
                connection.end();

        }
    })
}

function addDepartment() {
    console.log('New department info!');

}

function viewDepartments() {
    connection.query("SELECT department FROM departments", function (err, res) {
        if (err) throw err;
        console.table(res);
        processQuestions();
    })
}

function viewRoles() {
    connection.query("SELECT roles.title, roles.salary, departments.department FROM roles left join departments on roles.departmentId = departments.departmentId ORDER BY roles.rolesId", function (err, res) {
        if (err) throw err;
        console.table(res);
        processQuestions();
    })

}

function viewEmployees() {
    connection.query("SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.department FROM employees LEFT JOIN roles ON employees.rolesId = roles.rolesId LEFT JOIN departments ON roles.departmentId = departments.departmentId ORDER BY employees.employeeId", function (err, res) {
        if (err) throw err;
        console.table(res);
        processQuestions();
    })
}

function addDepartment() {
    inquirer.prompt({
        message: "What department do you want to add?",
        type: "input",
        name: "department"
    }).then(function (answer) {
        connection.query("INSERT INTO departments (department) VALUES ('" + answer.department + "')", function (err, res) {
            if (err) throw err;
            console.table(res);
            processQuestions();
        })
    })
}