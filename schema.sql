DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INTEGER NOT NULL,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price INTEGER NULL,
stock_quantity INTEGER NULL
);