const mysql = require('mysql');
const inquirer = require('inquirer');
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
          'View all employees by manager',
          'Add employee',
          'Remove employee',
          'Update employee role',
          'Update employee manager',
          'exit',
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
  
          case 'View all employees by manager':
            managerSearch();
            break;
  
          case 'Add employee':
            addEmployee();
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

  const artistSearch = () => {
    inquirer
      .prompt({
        name: 'artist',
        type: 'input',
        message: 'What artist would you like to search for?',
      })
      .then((answer) => {
        const query = 'SELECT position, song, year FROM top5000 WHERE ?';
        connection.query(query, { artist: answer.artist }, (err, res) => {
          if (err) throw err;
          res.forEach(({ position, song, year }) => {
            console.log(
              `Position: ${position} || Song: ${song} || Year: ${year}`
            );
          });
          runSearch();
        });
      });
  };

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
});