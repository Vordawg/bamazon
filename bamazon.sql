DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE if exists products;

CREATE TABLE products (
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    stock_quantity SMALLINT NOT NULL,
    KEY (item_id)
);

INSERT INTO `bamazon`.`products`
(`product_name`,
`department_name`,
`price`,
`stock_quantity`)
VALUES
('Degree Antiperspirant', 'Beauty', '4.47', 110),
('Harry Potter Books 1-7 Special Edition Boxed Set', 'Books', 50.99, 15),
('Nautica Long Sleeve Solid Polo Shirt', 'Clothing', 53.12, 9),
('Hamilton Beach Electric Indoor Grill', 'Eletronics', 48.99, 3),
('Avengers Endgame', 'Movies', 10.79, 270),
('GoPets Dematting Comb', 'Pets', 21.25, 31),
('Just Dance 2019', 'Video Games', 31.47, 75),
('Playskool Sit and Spin', 'Toys', 29.99, 85),
('Lite-Brite Classic Toy', 'Toys', 14.95, 300),
('The Hunger Games Trilogy Boxed Set', 'Books', 28.28, 203)
;
