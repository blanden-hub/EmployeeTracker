INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bryce", "Sitler", 5, 1), ("Angelina", "Rivera", 4, 1), ("Nick", "Arts", 3, 1);

INSERT INTO department (department_name)
VALUES ("Paint"), ("Pluming"), ("Cashier");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Paint", 30000, 1), ("Pluming", 35000, 2), ("Cashier", 15000, 3);