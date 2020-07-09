INSERT INTO departments (department)
VALUES
    ("Finance"),
    ("Programs"),
    ("Contracts");
INSERT INTO roles (title, salary, departmentId)
VALUES
    ("Sup 1", 4000, 1),
    ("EODDS", 5000, 2),
    ("DATA Broker", 3500, 2),
    ("Specialist", 5500, 3);
INSERT INTO employees (first_name, last_name, rolesId)
VALUES
    ("Pat", "Baker", 1),
    ("Amy", "Mitchell", 2),
    ("Bill", "Johnson", 3),
    ("Dev", "Patel", 4);


  -- SELECT

   -- roles.title, roles.salary, 
    
   -- departments.department 
    
  --  FROM roles left join departments on

   -- roles.departmentId = departments.departmentId

   -- ORDER BY roles.rolesId;