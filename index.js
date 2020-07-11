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
                // 1 populate the roles table ,
                // 2 select a query from the roles table 
                // 3 ask the user to to input their role/title, based on the list 
                // 4 ask for their salary
                // 5 do a query on dept that are currently there and
                // 6 ask the user the dept based on the list
                // 7 put the data into the table, for the roles table
                // INSERT statment will be needed to add into the roles table
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
        connection.query("INSERT INTO departments (department) VALUES ('" + answer.department + "')", function (err) {
            if (err) throw err;
            viewDepartments()
        })
    })
}

function deptName() {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM departments", function (err, data) {
            if (err) throw err;
            resolve(data)
        })
    })
}



function addRoles() {
    deptName().then(function (data) {
        console.log(data)
        let deptRole = data.map(function (deptId) {
            return deptId.departmentId
        })
        console.log(deptRole)

        inquirer.prompt([
            {
                message: "What is your title?",
                type: "input",
                name: "title"
            },
            {
                message: "What is your annual salary?",
                type: "number",
                name: "salary"
            },
            {
                message: "What department do you work in?",
                type: "list",
                name: "departmentId",
                choices: deptRole
            }
        ]).then(function (answer) {
            connection.query(`INSERT INTO roles (title, salary, departmentId) VALUES ("${answer.title}", ${answer.salary}, ${answer.departmentId})`, function (err) {
                if (err) throw err;
                viewRoles()
            })
        })
    })
}

function roleName() {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM roles", function (err, data) {
            if (err) throw err;
            resolve(data)
        })
    })
}

function addEmployees() {
    roleName().then(function (data) {
        let employX = data.map(function (roleX) {
            return roleX.rolesId
        })
        inquirer.prompt([
            {
                message: "What is your first name?",
                type: "input",
                name: "firstName"
            },
            {
                message: "What is your last name?",
                type: "input",
                name: "lastName"
            },
            {
                message: "What is your role?",
                type: "list",
                choices: employX,
                name: "role"
            }
        ]).then(function (res) {
            // console.log(res)
            connection.query(`INSERT INTO employees (first_name, last_name, rolesId) VALUES ("${res.firstName}", "${res.lastName}", ${res.role})`, function (err) {
                if (err) throw err;
                viewEmployees()
            })
        })
    })
};
function employName() {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM employees", function (err, data) {
            if (err) throw err;
            resolve(data)
        })
    })
}

function updateEmployee() {
    employName().then(function (data) {
        let employY = data.map(function (dataY) {
            return dataY.employeeId
        })
        roleName().then(function (title) {
            let roleY = title.map(function (titleY) {
                return titleY.rolesId
            })
            inquirer.prompt([
                {
                    message: "Which employee would you like to update?",
                    type: "list",
                    choices: employY,
                    name: "employee"
                },
                {
                    message: "What role would you like to change?",
                    type: "list",
                    choices: roleY,
                    name: "changeRole"
                }
            ]).then(function (res) {
                connection.query(`UPDATE employeetracker_db.employees SET rolesId= ${res.changeRole} WHERE employeeId=${res.employee}`, function (err) {
                    if (err) throw err;
                    viewEmployees()
                })
            })
        })
    })
}