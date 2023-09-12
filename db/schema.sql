--- Create a BLUE LIGHT SUITES EMLOYEE TRACKER database called `employee_tracker_db` and tables called `department`,
-- `role`, and `employee` using the following schema:                                                                                                                                                                                                                                                                                                    

DROP DATABASE IF EXISTS employee_tracker_db; 
CREATE DATABASE employee_tracker_db;  -- Create the database name employee_tracker_db

USE employee_tracker_db;

-- Create the department table
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);
-- Create the role table 
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER
);
-- Create the employee table
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER
);

-- Add foreign key constraints to the role table
ALTER TABLE employee
ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id),
ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id);

-- Additional bonus funcitonality 
-- DELETE statements for departments, roles, and employees
-- Delete a department by its ID
DELETE FROM department WHERE id = ?;

-- Delete a role by its ID
DELETE FROM role WHERE id = ?;

-- Delete an employee by their ID
DELETE FROM employee WHERE id = ?;
