"use strict";Object.defineProperty(exports, "__esModule", {value: true});

class UserController {
  async index (req, res) {
    res.json({ message: 'Hello World' })
  }
}

exports. default = new UserController()
