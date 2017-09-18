'use strict';

var _app_config = require('./config/app_config');

var _app_config2 = _interopRequireDefault(_app_config);

var _userRouter = require('./routes/userRouter');

var _userRouter2 = _interopRequireDefault(_userRouter);

var _db_config = require('./config/db_config');

var _db_config2 = _interopRequireDefault(_db_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app_config2.default.get('/', function (req, res) {
    res.send('API Think Mind');
});

_app_config2.default.use('/user', _userRouter2.default);
//# sourceMappingURL=app.js.map