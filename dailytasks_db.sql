DROP SCHEMA IF EXISTS `dailytasks_db`;
CREATE SCHEMA `dailytasks_db` DEFAULT CHARACTER SET utf8 ;
USE `dailytasks_db`;    

CREATE TABLE users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	user_type ENUM('Admin', 'User') NOT NULL DEFAULT 'User'
);

CREATE TABLE tasks (
	task_id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    due_date DATE NOT NULL,
    photo VARCHAR(255),
    status ENUM('Pendiente', 'En Progreso', 'Completada') NOT NULL DEFAULT 'Pendiente',
    assigned_to INT NOT NULL,
    assigned_by INT NOT NULL,
    FOREIGN KEY (assigned_to) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);