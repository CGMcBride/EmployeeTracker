DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE departments
(
    departmentId INT PRIMARY KEY AUTO_INCREMENT,
    department VARCHAR (30) NOT NULL  
);

CREATE TABLE roles
    (
        rolesId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL (10,2) INT NULL,
    departmentId INT,
    FOREIGN KEY (departmentId) REFERENCES departments(departmentId)
);

CREATE TABLE employees
(
    employeeId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    rolesId INT,
    FOREIGN KEY (rolesId) REFERENCES roles(rolesId)
);
