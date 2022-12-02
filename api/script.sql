CREATE DATABASE puntodeventa;
USE puntodeventa;
CREATE TABLE usuarios(
	id varchar(255) PRIMARY KEY,
    nombre varchar(255),
    contraseña varchar(255),
    registrado datetime,
    last_login datetime
);

USE puntodeventa;
CREATE TABLE productos(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(255),
    cantidad INT,
    costo INT
);

USE puntodeventa;
CREATE TABLE clientes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(255),
    apellido varchar(255),
    telefono INT
);

USE puntodeventa;
CREATE TABLE vendedores(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(255),
    apellido varchar(255),
    telefono INT
);

USE puntodeventa;
CREATE TABLE factura(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_vendedor INT,
    fecha datetime
);

USE puntodeventa;
CREATE TABLE detalle_factura(
    id_factura INT,
    id_producto INT,
    cantidad INT,
    costo INT
);