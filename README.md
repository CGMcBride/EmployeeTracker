# EmployeeTracker

### Describe

This challenge is to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

### Structure

There will be 3 tables to show how they all relate to each other within my created database.

##### department

_id -_
_name - Department name_

##### role

_id_
_Title - role title_
_Salary - role salary_
_Department_id - reference to department role belongs to_

##### employee

_id_
_First Name - employee first name_
_Last Name - employee last name_
_Role_id - INT to hold reference to role employee has_
_Manager_id_

### Command-line App

Allows the user to add, view, and update department, roles
