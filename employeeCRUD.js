const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
// require("console.table");

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'root',
  database: 'employee_DB',
});

const start = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'View all employees by department',
        'View all employees by role',
        'Add employee',
        'Add department',
        'Add role',
        'Remove employee',
        'Update employee role',
        'Update employee manager',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all employees':
          employeeSearch();
          break;

        case 'View all employees by department':
          departmentSearch();
          break;

        case 'View all employees by role':
          roleSearch();
          break;

        case 'Add employee':
          addEmployee();
          break;

        case 'Add department':
          addDepartment();
          break;

        case 'Add role':
          addRole();
          break;

        case 'Remove employee':
          removeEmployee();
          break;

        case 'Update employee role':
          updateRole();
          break;

        case 'Update employee manager':
          updateManager();
          break;

        case 'Exit':
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

//////////========================= 1. "View Employees"

const employeeSearch = () => {
  connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id ORDER BY employee.id ASC', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table('All Employees', res);
    start();
  });
};

//////////========================= 2. "View  all departments"
const departmentSearch = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table('All Departments', res);
    // connection.end();
    start();
  });

};



////////========================= 3. "View  all roles"
const roleSearch = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table('All Roles', res);
    // roleSearch();
    // connection.end();
    start();

  });

};

//////////========================= 4. "Add employee" 
const addEmployee = () => {
  connection.query('SELECT * FROM role', function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([{
          name: 'first_name',
          type: 'input',
          message: "What is the employee's fist name? ",
        },
        {
          name: 'last_name',
          type: 'input',
          message: "What is the employee's last name? "
        },
        {
          name: 'manager_id',
          type: 'input',
          message: "What is the employee's manager's ID? "
        },
        {
          name: 'role',
          type: 'list',
          choices: function () {
            var roleArray = [];
            for (let i = 0; i < res.length; i++) {
              roleArray.push(res[i].title);
            }
            return roleArray;
          },
          message: "What is this employee's role? "
        }
      ]).then(function (answer) {
        let role_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].title == answer.role) {
            role_id = res[a].id;
            console.log(role_id)
          }
        }
        connection.query(
          'INSERT INTO employee SET ?', {
            first_name: answer.first_name,
            last_name: answer.last_name,
            manager_id: answer.manager_id,
            role_id: role_id,
          },
          function (err) {
            if (err) throw err;
            console.log('Your employee has been added!');
            start();
          })
      })
  })
};


//////////========================= 5. "Add Department" 

const addDepartment = () => {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([{
        name: 'department',
        type: 'input',
        message: "What department would you like to add? ",
      }, ]).then(function (answer) {
        connection.query(
          'INSERT INTO department SET ?', {
            name: answer.department,
          },
          function (err) {
            if (err) throw err;
            console.log('Your department has been added!');
            start();
          })
      })
  })
};



//////////========================= 6. "Add Roles" 


const addRole = () => {
  connection.query('SELECT * FROM role', function (err, res) {
    connection.query('SELECT * FROM department', function (err, response_dept) {
      //this is equivalent to response_dept[i], i++, i< response_dept.length
      let departments = response_dept.map((dept) => {
        return {
          name: dept.name,
          value: dept.id
        }
      })
      if (err) throw err;
      inquirer
        .prompt([{
            name: 'title',
            type: 'input',
            message: "What Employee title would you like to add? ",
          },
          {
            name: 'salary',
            type: 'input',
            message: "What salary would you like for this role? ",
          },
          {
            name: 'department_id',
            type: 'list',
            choices: departments,
            message: "What is the department for this role? ",
          },
        ]).then(function (answer) {
          connection.query(
            'INSERT INTO role SET ?', {
              title: answer.title,
              salary: answer.salary,
              department_id: answer.department_id,
            },
            function (err) {
              if (err) throw err;
              console.log('Your new title has been added!');
              start();
            })
        })
    })
  })
};




//////////========================= 7. "Update Employee Roles" 


//////////========================= 8. "Remove employee"  
// const removeEmployee = () => {
//   console.log('Deleting employee...\n');
//   connection.query(
//     'DELETE FROM employee WHERE ?', (err, res) => {
//       if (err) throw err;
//   inquirer
//   .prompt([
//     {
//       name: 'employees', 
//       type: 'list',
//       choices: function() {
//       var empArray = [];
//       for (let i = 0; i < res.length; i++) {
//           empArray.push(res[i].title);
//       }
//       return empArray;
//       },
//       message: "Which employee would you like to remove? "
//   }
//   ])

//       console.log(`${res.affectedRows} employee deleted!\n`);
//       start();
//     }
//   );
// };

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  start();
});