const conf = require('./config.js');
var inquirer = require("inquirer");
const mysql = require('promise-mysql');

function selectAllProducts(connection) {
    console.log('Selecting all items from bamazon.products\n');
    const query = 'SELECT item_id, product_name, price FROM PRODUCTS ORDER BY 1';
    return connection.query(query)
        .then((res) => {
            console.log(res);
        });
}

function getProduct(productNumber, connection) {
    console.log('Selecting product_name, stock_quantity from bamazon.products\n');
    return connection.query(
        'SELECT product_name, stock_quantity FROM PRODUCTS songs WHERE ?',
        [
            {
                item_id: productNumber,
            },
        ])
        .then((res) => {
            if (res.length == 0) {
                console.log("Invalid item ID.")
                return '';
            }
            else {
                allowToBuy(res[0].product_name, res[0].stock_quantity, connection);
            }
        });
}

function updateQuantity(productName, quantity, connection) {
    console.log('Updating bamazon.products\n');
    const result = connection.query('UPDATE PRODUCTS SET ? WHERE ?',
        [
            {
                stock_quantity: quantity,
            },
            {
                product_name: productName,
            },
        ]).then((res) => {
            console.log(res);
        });
}

function getProductID(connection) {
    inquirer.prompt([
        {
            type: "input",
            name: "productNumber",
            message: "What is the ID of the product they would like to buy?",
        }
    ])
        .then(function (val) {
            var productNumber = parseInt(val.productNumber);
            getProduct(productNumber, connection);
        });
}

function allowToBuy(productName, quantity, connection) {
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "How many " + productName + " would you like to buy?",
        }
    ])
        .then(function (val) {
            var selectedQuantity = parseInt(val.quantity);
            if (selectedQuantity > quantity) {
                console.log("Insufficient quantity in stock!");
            }
            else {
                console.log("You have purchased " + selectedQuantity + " of " + productName + ".");
                updateQuantity(productName, quantity - selectedQuantity, connection)
            }

        });
}

async function run() {
    const connection = await mysql.createConnection(conf);

    await selectAllProducts(connection);

    await getProductID(connection);
}

run();