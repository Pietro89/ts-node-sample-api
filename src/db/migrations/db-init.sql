create database hello;

create table users(
id uuid primary key,
name varchar(250) not null,
createdAt timestamp,
updatedAt timestamp
);
