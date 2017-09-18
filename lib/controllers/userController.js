'use strict';

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.save = function (user, callback) {
    var encrypToken = _helper2.default.token(user.name);
    _helper2.default.message(encrypToken);
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
                token: encrypToken,
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

    _user2.default.findOne({ token: user.token }).then(function (person) {
        var password = _helper2.default.decryptPassword(user.password, person.password);
        if (password) return callback(user.token);else return callback('Senha incorreta');
    }).catch(function (err) {
        throw err;
    });
};

exports.changePassword = function (user, callback) {

    _user2.default.findOne({ token: user.token }).then(function (person) {

        var password = _helper2.default.descryptPassword(user.password, person.password);
        if (password) {
            _user2.default.findOneAndUpdate({ token: user.token }, { password: user.password });
            callback(person);
        }
        callback("Senha errada");
    });
};
//# sourceMappingURL=userController.js.map