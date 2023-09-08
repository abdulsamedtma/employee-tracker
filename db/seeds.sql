-- Inserts names of departments into department table
INSERT INTO department (name)
VALUES
  ('Software Engineering'),
  ('Sales & Marketing'),
  ('Finance'),
  ('Legal');


-- Inserts roles of employee into role table
INSERT INTO role (title, salary, department_id)
VALUES
  ('Software Developer', 85000, 1),
  ('Salesperson', 75000, 2),
  ('Accountant', 125000, 3),
  ('Lawyer', 200000, 4);
 

-- Inserts employee information into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Abdul', 'Alhassanikov', 1, 4),
  ('Nick', 'Hanson', 2, 3),
  ('Kayenti', 'Ewuntomah', 3, 1),
  ('Boreyin', 'Bilal', 4, 5);