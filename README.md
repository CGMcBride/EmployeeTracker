# EmployeeTracker

### Describe

This challenge is to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

### Structure

There will be 3 tables to show how they all relate to each other within my created database.

**department**

*id -
*name - Department name
**role**

*id
*Title - role title
*Salary - role salary
*Department_id - reference to department role belongs to
**employee**

*id
*First Name - employee first name
*Last Name - VARCHAR(30) to hold employee last name
*Role_id - INT to hold reference to role employee has
\*Manager_id

### Command-line App

Allows the user to add, view, and update department, roles
