DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)

);

CREATE TABLE emprole (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,4) NULL,
    department_id INT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE employee (
   id INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(30),
   last_name VARCHAR(30),
   role_id INT NOT NULL,
   manager_id INT NULL,
   PRIMARY KEY (id)

); 

SELECT * FROM employee_DB;
SELECT * FROM employee_DB.employee;
SELECT * FROM employee_DB.emprole;
SELECT * FROM employee_DB.department;