'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../controllers/userController.js');

var _userController2 = _interopRequireDefault(_userController);

var _emailValidator = require('email-validator');

var _emailValidator2 = _interopRequireDefault(_emailValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var UserSchema = {};
router.post('/', function (req, res) {

    UserSchema = req.body;

    if (UserSchema.email != '') {
        if (_emailValidator2.default.validate(UserSchema.email) == true) {
            console.log(UserSchema);
            _userController2.default.save(UserSchema, function (resp) {
                res.json(resp);
            });
        } else {
            res.json('Insira um email valido');
        }
    } else {
        res.json('Email vazio');
    }
});

router.put('/', function (req, res) {

    UserSchema = req.body;
    _userController2.default.changePassword(UserSchema, function (resp) {
        res.json(resp);
    });
});

router.post('/login', function (req, res) {
    UserSchema = req.body;
    _userController2.default.login(UserSchema, function (resp) {
        res.json(resp);
    });
});

exports.default = router;
//# sourceMappingURL=userRouter.js.map