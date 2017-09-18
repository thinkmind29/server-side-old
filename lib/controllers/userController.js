'use strict';

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.save = function (user, callback) {

    _user2.default.findOne({ 'email': user.email }).then(function (person) {
        if (person) {
            callback('The User Alright Exists');
        } else {

            new _user2.default({
                name: user.name,
                lastName: user.lastName,
                password: _helper2.default.encryptPassword(user.password),
                email: user.email,
                hability: user.hability,
                biography: user.biography,
                token: _helper2.default.token(user.name),
                create_at: user.data

            }).save().then(function (users) {
                return callback(users);
            }).catch(function (err) {
                throw err;
            });
        }
    }).catch(function (err) {
        throw err;
    });
};

exports.login = function (user, callback) {

    _helper2.default.message(user);

    _user2.default.findOne({ email: user.email }).then(function (person) {
        //helper.message(person);
        var password = _helper2.default.decryptPassword(user.password, person.password);
        _helper2.default.message(password);
        if (password) return callback(user.token);else return callback('Senha incorreta');
    }).catch(function (err) {
        throw err;
    });
};

exports.changePassword = function (user, callback) {
    var query = { token: user.token };
    _user2.default.findOneAndUpdate(query, { $set: { password: user.newPassword } }, function (err, person) {
        if (err) {
            _helper2.default.message(err);
        } else if (person === null) {
            callback('Você não está autorizado a acessar essa função');
        } else {
            _helper2.default.message(person);
        }
    });
};
//# sourceMappingURL=userController.js.map