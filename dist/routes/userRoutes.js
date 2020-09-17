"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

const router = _express.Router.call(void 0, )

router.get('/', _UserController2.default.index)

exports. default = router
