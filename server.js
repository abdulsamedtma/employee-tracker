// Import required modules/packages
const inquirer = require('inquirer'); // Import inquirer.js for user prompts
const db = require('./db/connection'); // Import connection.js for database connection

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('WELCOME TO BLUELIGHT SUITES EMPLOYEE TRACKER DATABASE.');
  employeeTracker(); // Call the main function
});

// Function to view all departments
function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) throw err;
    console.log("Viewing All Departments: ");
    console.table(result);
    employeeTracker(); // Return to the main menu
  });
}

// Function to view all roles
function viewRoles() {
  db.query(`SELECT * FROM role`, (err, result) => {
    if (err) throw err;
    console.log("Viewing All Roles: ");
    console.table(result);
    employeeTracker(); // Return to the main menu
  });
}

// Function to view all employees
function viewEmployees() {
  db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) throw err;
    console.log("Viewing All Employees: ");
    console.table(result);
    employeeTracker(); // Return to the main menu
  });
}

// Function to add a department
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'What is the name of the department?',
      validate: (departmentInput) => {
        return departmentInput ? true : 'Please Add A Department!';
      },
    },
  ]).then((answers) => {
    db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
      if (err) throw err;
      console.log(`Added ${answers.department} to the database.`);
      employeeTracker(); // Return to the main menu
    });
  });
}

// Function to add a role
function addRole(departments) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: 'What is the name of the role?',
      validate: (roleInput) => {
        return roleInput ? true : 'Please Add A Role!';
      },
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role?',
      validate: (salaryInput) => {
        return salaryInput ? true : 'Please Add A Salary!';
      },
    },
    {
      type: 'list',
      name: 'department',
      message: 'Which department does the role belong to?',
      choices: departments,
    },
  ]).then((answers) => {
    const departmentId = departments.indexOf(answers.department) + 1;
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, departmentId], (err, result) => {
      if (err) throw err;
      console.log(`Added ${answers.role} to the database.`);
      employeeTracker(); // Return to the main menu
    });
  });
}

// Function to add an employee
function addEmployee(roles, employees) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the employee\'s first name?',
      validate: (firstNameInput) => {
        return firstNameInput ? true : 'Please Add A First Name!';
      },
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the employee\'s last name?',
      validate: (lastNameInput) => {
        return lastNameInput ? true : 'Please Add A Last Name!';
      },
    },
    {
      type: 'list',
      name: 'role',
      message: 'What is the employee\'s role?',
      choices: roles,
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Who is the employee\'s manager?',
      choices: employees,
    },
  ]).then((answers) => {
    const roleId = roles.indexOf(answers.role) + 1;
    const managerId = employees.indexOf(answers.manager) + 1;
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, roleId, managerId], (err, result) => {
      if (err) throw err;
      console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`);
      employeeTracker(); // Return to the main menu
    });
  });
}

// Function to update an employee's role
function updateEmployeeRole(employees, roles) {
  inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Which employee\'s role do you want to update?',
      choices: employees,
    },
    {
      type: 'list',
      name: 'role',
      message: 'What is their new role?',
      choices: roles,
    },
  ]).then((answers) => {
    const employeeId = employees.indexOf(answers.employee) + 1;
    const roleId = roles.indexOf(answers.role) + 1;
    db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleId, employeeId], (err, result) => {
      if (err) throw err;
      console.log(`Updated ${answers.employee}'s role to ${answers.role} in the database.`);
      employeeTracker(); // Return to the main menu
    });
  });
}

// Function to delete a department from the database using the department's ID
function deleteDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the ID of the department you want to delete:',
          validate: (input) => {
            return !isNaN(input) && input.trim() !== ''; // Check if input is a number
          },
        },
      ])
      .then((answers) => {
        const departmentId = parseInt(answers.departmentId);
  
        db.query('DELETE FROM department WHERE id = ?', [departmentId], (err, result) => {
          if (err) throw err;
          console.log(`Deleted department with ID ${departmentId}`);
          employeeTracker();
        });
      });
  }

  // Function to delete an employee from the database using the employee's ID
function deleteEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee you want to delete:',
          validate: (input) => {
            return !isNaN(input) && input.trim() !== ''; // Check if input is a number
          },
        },
      ])
      .then((answers) => {
        const employeeId = parseInt(answers.employeeId);
  
        db.query('DELETE FROM employee WHERE id = ?', [employeeId], (err, result) => {
          if (err) throw err;
          console.log(`Deleted employee with ID ${employeeId}`);
          employeeTracker();
        });
      });
  }
  // Function to delete a role from the database unsing the role's ID
function deleteRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the ID of the role you want to delete:',
          validate: (input) => {
            return !isNaN(input) && input.trim() !== '';
          },
        },
      ])
      .then((answers) => {
        const roleId = parseInt(answers.roleId);
  
        db.query('DELETE FROM role WHERE id = ?', [roleId], (err, result) => {
          if (err) throw err;
          console.log(`Deleted role with ID ${roleId}`);
          employeeTracker();
        });
      });
  }
// Function to display the main menu and handle user choices
async function employeeTracker() {
  db.query(`SELECT * FROM department`, async (err, departments) => {
    if (err) throw err;
    departments = departments.map((department) => department.name);

    db.query(`SELECT * FROM role`, async (err, roles) => {
      if (err) throw err;
      roles = roles.map((role) => role.title);

      db.query(`SELECT * FROM employee`, async (err, employees) => {
        if (err) throw err;
        employees = employees.map((employee) => `${employee.first_name} ${employee.last_name}`);

        const { prompt } = await inquirer.prompt([
          {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: [
              'View All Departments',
              'View All Roles',
              'View All Employees',
              'Add A Department',
              'Add A Role',
              'Add An Employee',
              'Update An Employee Role',
              'Delete A Department',
              'Delete An Employee',
              'Delete A Role',
              'Log Out',
            ],
          },
        ]);

        switch (prompt) {
          case 'View All Departments':
            viewDepartments();
            break;
          case 'View All Roles':
            viewRoles();
            break;
          case 'View All Employees':
            viewEmployees();
            break;
          case 'Add A Department':
            addDepartment();
            break;
          case 'Add A Role':
            addRole(departments);
            break;
          case 'Add An Employee':
            addEmployee(roles, employees);
            break;
          case 'Update An Employee Role':
            updateEmployeeRole(employees, roles);
            break;
          case 'Delete A Department':
            deleteDepartment();
            break;
          case 'Delete An Employee':
            deleteEmployee();
            break;
          case 'Delete A Role':
            deleteRole();
            break;
          case 'Log Out':
            db.end();
            console.log('-------------------------------------------------');
            console.log('Thank you for using the Employee Tracker App!');
            console.log();
            console.log('I appreciate your time and hope you found the application useful. If you have any feedback or suggestions for improvement, please don\'t hesitate to let us know. Your input helps us make the app even better!');
            console.log();
            console.log('Have a fruitful day!');
            console.log('✨  Every day is a learning day!  ✨');
            break;
        }
      });
    });
  });
}
