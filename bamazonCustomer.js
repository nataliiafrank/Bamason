// Dependencies
require('dotenv').config();

var mysql = require('mysql');
var inquirer = require('inquirer');

// MySQL DB Connection Information
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.password,
    database: 'bamazon'
});

// MySQL Connection
connection.connect(function (err) {
    if (err) throw err;
    listProducts();
});

// FUNCTIONS
// Function for dispalying all products
var listProducts = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log('\n-- ITEMS AVALIBLE IN THE STORE --\n');
        console.log('ID' + ' | ' + ' ITEM ' + ' | ' + 'CATEGORY' + ' | ' + ' PRICE ' + ' | ' + 'QUONTITY');
        // Loops through all the items and renders the data
        for (i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ' | ' + res[i].product_name + ' | ' + res[i].department_name + ' | ' + '$' + res[i].price + ' | ' + res[i].stock_quantity);
        }
        console.log('\n');
        // Calling the function with prompts
        makeOrder();
    });
}

// Function for selecting products
var makeOrder = function () {
    // Asking a user for an id and quontity of a product
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Enter item id that you would like to order?"
    }, {
        name: "count",
        type: "input",
        message: "How many items would you like to order?"
    }]).then(function (answer) {
        // Selecting items by id
        var query = "SELECT * FROM products where ?";
        connection.query(query, {
            item_id: answer.id
        }, function (err, res) {
            if (err) throw err;
            // Cheack if there is enough items avalible
            if (answer.count > res[0].stock_quantity) {
                console.log('You are trying to order more items than is available in stock');
                listProducts();
            } else {
                processOrder(answer.id, answer.count, res[0].stock_quantity);
            }
        });
    });
}

// Function for updating database
var processOrder = function (id, count, stock_quantity) {
    var processOrderQuery = "UPDATE products SET ? WHERE ?";
    connection.query(processOrderQuery, [{
        stock_quantity: stock_quantity - count
    }, {
        item_id: id
    }], function (err, res) {
        connection.query("SELECT * FROM products WHERE ?", {
            item_id: id
        }, function (err, res) {
            console.log("You successfully made an order!");
            console.log("Your total cost is $" + res[0].price * count);
            nextOrder();
        });
    });
}

// Function for making another order/exiting the app
var nextOrder = function() {
    inquirer.prompt([{
        name: 'next',
        type: 'confirm',
        message: 'Do you want to make another order?'
    }]).then(function (answer) {
        if (answer.next == true) {
            listProducts();
        } else {
            console.log('Thank you for shopping with us, see you next time!!!');
            process.exit(0);
        }
    });
}