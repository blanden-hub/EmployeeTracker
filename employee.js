const mysql = require('mysql2');
const inquirer = require('inquirer');
require("console.table");

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3001',
    user: 'root',
    password: 'password',
    database: 'employee_db',
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    console.log('Employee Manager')
    main();
});

function main() {
    inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["view all employees", "view employee roles", "view all departments", "view all employees by department", "view all employees by manager",
            "add employee", "add Role", "add departments", "remove role", "remove department", "remove employee", "update employee role", "update employee manager", "total budget by department", "quit"
        ]
    }]).then((answers) => {
        switch (answers.choice) {
            case "view all employees":
                getEmployees();
                break;
            case "view employee roles":
                getEmployeeRoles();
                break;
            case "view all departments":
                getEmployeeDepartments();
                break;
            case "view all employees by department":
                getEmployeesByDept();
                break;
            case "view all employees by manager":
                getEmployeesByManager();
                break;
            case "add employee":
                addEmployee();
                break;
            case "add role":
                addRole();
                break;
            case "add departments":
                addDepartments();
                break;
            case "remove employee":
                removeEmployee();
                break;
            case "remove role":
                removeRole();
                break;
            case "remove department":
                removeDepartment();
                break;
            case "update employee role":
                updateEmployeeRole();
                break;
            case "update employee manager":
                updateEmployeeManager();
                break;
            case "total budget by department":
                budgetByDept();
                break;
            case "quit":
                connection.end();
                break;
        }
    })
}
