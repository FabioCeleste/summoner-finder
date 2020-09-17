"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('reflect-metadata');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _typeorm = require('typeorm');

var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);

_dotenv2.default.config()

class App {
    

     constructor () {
      this.express = _express2.default.call(void 0, )
      this.middlewares()
      this.routes()
    }

     middlewares () {
      this.express.use(_express2.default.json())
      this.express.use(_cors2.default.call(void 0, ))
      _typeorm.createConnection.call(void 0, )
    }

     routes () {
      this.express.use('/users', _userRoutes2.default)
    }
}

exports. default = new App().express
