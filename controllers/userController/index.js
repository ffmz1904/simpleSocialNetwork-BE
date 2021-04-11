const registration = require('./registration');
const login = require('./login');
const check = require('./check');
const create_subscribe_request = require('./create_subscribe_request');
const confirm_subscribe_request = require('./confirm_subscribe_request');

module.exports = {
    registration,
    login,
    check,
    create_subscribe_request,
    confirm_subscribe_request
};
