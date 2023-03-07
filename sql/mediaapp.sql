drop database if exists mediaapp_sql;
create database mediaapp_sql;
use mediaapp_sql;

#CREACIÓN DE UNA TABLA USUARIO CON ID_ROL COMO FK
create table USUARIO(
id_usuario int auto_increment primary key,
nombre varchar(50) not null,
apellido1 varchar(100) not null,
apellido2 varchar(100) not null,
nick varchar(50) not null,
mail varchar(256) not null,
contraseña varchar(3000) not null,
descripcion varchar(3000),
img_perfil varchar(500),
img_banner varchar(500),
session_token varchar(3000) not null,
id_rol int not null
);

#CREACIÓN DE UNA TABLA ROL_USUARIO
create table ROL_USUARIO(
id_rol int auto_increment primary key,
nombre varchar(50) not null,
descripcion varchar(100) not null
);

#CREACIÓN DE UNA TABLA ALMACENADO_JUEGO
create table ALMACENADO_JUEGO(
id_juego_almacenado int auto_increment primary key,
id_juego int not null,
id_usuario int not null,
nombre_juego varchar(100) not null,
tipo varchar(50) not null,
estado varchar(50) not null,
puntuacion decimal not null,
veces_pasado int,
fecha_de_finalizacion date
);

#CREACIÓN DE UNA TABLA JUEGO
create table JUEGO(
id_juego int auto_increment primary key,
nombre varchar(100) not null
);

ALTER TABLE USUARIO ADD CONSTRAINT fk_rol_usuario FOREIGN KEY (id_rol) REFERENCES ROL_USUARIO(id_rol);

ALTER TABLE ALMACENADO_JUEGO ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario);

ALTER TABLE ALMACENADO_JUEGO ADD CONSTRAINT fk_juego FOREIGN KEY (id_juego) REFERENCES JUEGO(id_juego);



#INSERTADOS TODOS LOS TIPOS DE USUARIO QUE EXISTEN Y UNA DESCRIPCIÓN
INSERT INTO `mediaapp_sql`.`rol_usuario` (`id_rol`, `nombre`, `descripcion`) VALUES ('1', 'admin', 'Tiene todos los permisos');
INSERT INTO `mediaapp_sql`.`rol_usuario` (`id_rol`, `nombre`, `descripcion`) VALUES ('2', 'moderador', 'Solo tiene permisos especiales');
INSERT INTO `mediaapp_sql`.`rol_usuario` (`id_rol`, `nombre`, `descripcion`) VALUES ('3', 'user', 'Usuario normal');



