const registration = require('./registration');
const login = require('./login');
const check = require('./check');
const getUserById = require('./getUserById');
const getAllUsers = require('./getAllUsers');
const create_subscribe_request = require('./create_subscribe_request');
const confirm_subscribe_request = require('./confirm_subscribe_request');
const unsubscribe = require('./unsubscribe');
const getUserFriendsData = require('./getUserFriendsData');

module.exports = {
    registration,
    login,
    check,
    getUserById,
    getAllUsers,
    create_subscribe_request,
    confirm_subscribe_request,
    unsubscribe,
    getUserFriendsData
};
