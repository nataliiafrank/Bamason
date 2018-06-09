DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,4) NOT NULL,
stock_quantity INTEGER NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("SONY TV", "Electronics", 500, 10),
("iPhone X", "Electronics", 1200, 5),
("H&M Dress", "Clothes", 30.99, 22),
("Michael Kors", "Sweater", 85, 40),
("Gucci Bag", "Accessories", 8.980, 1),
("Lip Balm", "Cosmetics", 6.99, 135),
("Curling Iron", "Beauty", 75.99, 45),
("Space Jam", "Movies DVD", 5.50, 300),
("Books", "Hobbit", 24.99, 15),
("Books", "Wonder", 20, 20);

SELECT * FROM products;