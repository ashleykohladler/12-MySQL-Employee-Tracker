USE employee_DB;

INSERT INTO department 
    (name)

VALUES
    ('Manager'),
    ('Web Dev'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)

VALUES
    ('Project Manager', 150000, 1),
    ('Full Stack Dev', 200000, 2),
    ('Lawyer', 250000, 3);


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)

VALUES
    ('Ashley', 'Adler', 1, NULL),
    ('Jovan', 'Nixon', 2, NULL),
    ('Mel', 'Elson', 3, NULL);

-- INSERT INTO department (name)
-- VALUES ("Project Manager");

-- INSERT INTO department (name)
-- VALUES ("Full Stack Dev");

-- INSERT INTO department (name)
-- VALUES ("Lawyer");

-- INSERT INTO emprole (title, salary, department_id)
-- VALUES ("Project Manager", 150000, 10);

-- INSERT INTO emprole (title, salary, department_id)
-- VALUES ("Full Stack Dev", 200000, 11);

-- INSERT INTO emprole (title, salary, department_id)
-- VALUES ("Lawyer", 250000, 12);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Ashley", "Adler", 25 , 50);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Jovan", "Nixon", 26 , 50);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Mel", "Elson", 27 , 50);


    





