DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE employee
(
    id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY;
    NAME VARCHAR
    (30) NOT NULL,
    BUILD INT NULL
);

    CREATE TABLE department
    (
        id INT NOT NULL
        AUTO_INCREMENT PRIMARY KEY;
    NAME VARCHAR
        (30) NOT NULL,
    BUILD INT NULL
);

        CREATE TABLE role
        (
            id INT NOT NULL
            AUTO_INCREMENT PRIMARY KEY;
    NAME VARCHAR
            (30) NOT NULL,
    BUILD INT NULL
)