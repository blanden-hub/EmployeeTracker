const inquirer = require("inquirer");
const connection = require("./connection.js")
require("console.table")
start();

//const answer = ["ADD", "UPDATE", "VIEW", "EXIT"];

function start() {
    inquirer.prompt({
            name: "add view update",
            type: "list",
            message: "would you like to add, update, or view?",
            choices: ["ADD", "UPDATE", "VIEW", "EXIT"]
        })
        .then(function (answer) {
            if (answer.addViewUpdate === "ADD") {
                console.log('hi');
                add();
            } else if (answer.addViewUpdate === "UPDATE") {
                update();
            } else if (answer.addViewUpdate === "VIEW") {
                view();
            } else {
                //connection.end();
            }
        })
}

function add() {
    inquirer.prompt([{
            name: "view",
            type: "list",
            message: "what would you like to add?",
            choices: ["Employee", "Department", "Role"]
        }])
        .then(function (answer) {
            if (answer.view === "Employee") {
                inquirer.prompt([{
                        name: "firstName",
                        type: "input",
                        message: "what is the employees first name?"
                    },
                    {
                        name: "lastName",
                        type: "input",
                        message: "what is the employees last name?"
                    },
                    {
                        name: "roleId",
                        type: "input",
                        message: "what is the employees role id?"
                    },
                    {
                        name: "managerId",
                        type: "input",
                        message: "what is the employees manager id?"
                    }
                ]).then(function (answer) {
                    connection.query(
                        "INSERT INTO employee SET ?", {
                            first_name: answer.firstName,
                            last_name: answer.lastName,
                            role_id: answer.roleId,
                            manager_id: answer.managerId
                        },
                        function (err) {
                            if (err) throw err;
                            console.log("employee created sucessfully!");
                            start();
                        }
                    )
                })
            } else if (answer.view === "Department") {
                inquirer.prompt([{
                    name: "departmentName",
                    type: "input",
                    message: "What is the department name?"
                }]).then(function (answer) {
                    connection.query(
                        "INSERT INTO department SET ?", {
                            department_name: answer.departmentName,
                        },
                        function (err) {
                            if (err) throw err;
                            console.log("Department created sucessfully!");
                            start();
                        }
                    )
                })
            } else if (answer.view === "Role") {
                inquirer.prompt([{
                        name: "title",
                        type: "input",
                        message: "What is the employees title?"
                    },
                    {
                        name: "salary",
                        type: "input",
                        message: "What is the employees salary?"
                    },
                    {
                        name: "id",
                        type: "input",
                        message: "What is the employees department id?"
                    }
                ]).then(function (answer) {
                    connection.query(
                        "INSERT INTO employee_role SET ?", {
                            title: answer.title,
                            salary: answer.salary,
                            department_id: answer.id
                        },
                        function (err) {
                            if (err) throw err;
                            console.log("Employee role created sucessfully!");
                            start();
                        }
                    )
                })
            }
        });
}

function view() {
    inquirer.prompt([{
            name: "view",
            type: "list",
            message: "What would you like to view?",
            choices: ["Employees", "Departments", "Roles"]
        }])
        .then(function (answer) {
            if (answer.view === "Employees") {
                printTable("employee")
            } else if (answer.view === "Departments") {
                printTable("department")
            } else if (answer.view === "Roles") {
                printTable("employee_role")
            }
        });
}

// function printTable(data) {
//     const query = "SELECT * FROM " + data;
//     connection.query(query, function (err, res) {
//         if (err) throw err;
//         console.table(res);
//         start();
//     });
// }