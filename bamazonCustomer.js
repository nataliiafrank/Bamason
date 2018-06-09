require('dotenv').config();

var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: process.env.password,
    database: 'bamazon'
});


connection.connect(function (err) {
    if (err) throw err;
    listProducts();
});


var makeOrder = function () {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Enter item id that you would like to order?"
    }, {
        name: "count",
        type: "input",
        message: "How many items would you like to order?"
    }]).then(function (answer) {
        var query = "SELECT * FROM products where ?";
        connection.query(query, {
            item_id: answer.id
        }, function (err, res) {
            if (err) throw err;
           
            if (answer.count > res[0].stock_quantity) {
                console.log('You are trying to order more items than is available in stock');
                listProducts();
            } else {
                processOrder(answer.id, answer.count, res[0].stock_quantity);
            }
        });
    });
};


var listProducts = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log('-- Items avalable in the store --\n');
        console.log('ID' + ' | ' + ' ITEM ' + ' | ' + 'CATEGORY' + ' | ' + ' PRICE ' + ' | ' + 'QUONTITY');
        for (i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ' | ' + res[i].product_name +  ' | ' + res[i].department_name + ' | ' + '$' + res[i].price + ' | ' + res[i].stock_quantity);
        }
        makeOrder();
    });
};


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
        });
        
    });
    
};