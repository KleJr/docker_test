CREATE DATABASE IF NOT EXISTS bd_dockertest;

USE bd_dockertest;

CREATE TABLE IF NOT EXISTS products (
    id INT(11) AUTO_INCREMENT,
    name VARCHAR(255),
    price DECIMAL(10,2),
    PRIMARY KEY (id)
);

INSERT INTO products VALUE(0,'Curso de Docker', 100);
INSERT INTO products VALUE(0,'Curso de C#',150);