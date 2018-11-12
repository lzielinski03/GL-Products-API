var async = require('async');

module.exports = function (app) {
    console.log();
    var store = app.dataSources.pgDataSource;
    store.automigrate(['Customer', 'Product', 'Comment'], function () { init() });

    const init = async function () {
        const [customer] = await createCustomer()
        const [product] = await createProduct(customer.id)
        const comment = await createComment(product.id, product.customerId);

        // console.log('\ncustomer created', customer);
        // console.log('\nproduct created', product);
        // console.log('\ncomment created', comment);
    };

    const createCustomer = async function () {
        const Customer = app.models.Customer;
        try {
            const customer = await Customer.create([{
                "realm": "nose",
                "username": "paco",
                "email": "paco@todos.los",
                "emailVerified": true,
                "password": "pista"
            }]);
            return customer;
        } catch (e) {
            const [error] = e;
            console.log(error.message)
            return null;
        }
    };

    const createProduct = async function (customerId) {
        const Product = app.models.Product;

        try {
            const product = await Product.create([{
                "name": "Test product",
                "price": 1000,
                "rating": 1,
                "description": "this is a product from seed data",
                "date": Date.now(),
                "customerId": customerId
            }]);
            return product;
        } catch (e) {
            const [error] = e;
            console.log(error.message)
            return null;
        }
    };

    const createComment = async function (productId, customerId) {
        const Comment = app.models.Comment;

        try {
            const comment = await Comment.create([{
                "date": Date.now(),
                "body": "First comment lol!",
                "productId": productId,
                "customerId": customerId
            }]);
            return comment;
        } catch (e) {
            const [error] = e;
            console.log(error.message)
            return null;
        }
    };

}
