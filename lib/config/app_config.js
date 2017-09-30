'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportFacebook = require('passport-facebook');

var _passportFacebook2 = _interopRequireDefault(_passportFacebook);

var _keys = require('../helpers/keys');

var _keys2 = _interopRequireDefault(_keys);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = _helper2.default.normalizePort(process.env.PORT || '3000');
var FacebookStrategy = _passportFacebook2.default.Strategy;

_passport2.default.use(new FacebookStrategy({
    clientID: _keys2.default.ID,
    clientSecret: _keys2.default.SecretKey,
    callbackURL: _keys2.default.URL
}, function (accessToken, refreshToken, profile, done) {
    _user2.default.findOne({ provider_id: profile.id }, function (err, user) {
        if (err) throw err;
        if (!err && user != null) return done(null, user);

        var user = new _user2.default({
            provider_id: profile.id,
            provider: profile.provider,
            name: profile.displayName,
            photo: profile.photo
        });
        user.save(function (err) {
            if (err) throw err;
            done(null, user);
        });
    });
}));

app.set('port', port);
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {

    res.setHeader('Access-Allow-Control-Origin', '*');
    res.setHeader('Access-Control-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Request-Witdh, content-type, Authorization');
    next();
});

var server = _http2.default.createServer(app);
server.listen(port);

_helper2.default.message('Conected from the port ' + port);

exports.default = app;
//# sourceMappingURL=app_config.js.map