import express from "express";
const User = require("./../models/User");
const Calendar = require("./../models/Calendar");

module.exports = {
  async add(request: express.Request, response: express.Response) {
    const {
      name,
      birthDate,
      gender,
      street,
      number,
      sector,
      city,
      state,
      alergics,
    } = request.body;

    try {
      const user = await User.create({
        name,
        birthDate,
        gender,
        street,
        number,
        sector,
        city,
        state,
        alergics,
      });

      return response.json(user);
    } catch (err) {
      return response.status(500).json("Internal server error");
    }
  },

  async getAll(request: express.Request, response: express.Response) {
    try {
      const users: typeof User = await User.find({});

      return response.json({
        users,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async get(request: express.Request, response: express.Response) {
    const _id = request.params.id;

    try {
      const user: typeof User = await User.find({ _id });

      return response.json({
        user: user[0],
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async delete(request: express.Request, response: express.Response) {
    const _id = request.params.id;

    try {
      await User.remove({ _id });
      await Calendar.remove({ user: _id });

      return response.json({}).status(200);
    } catch (err) {
      return response.status(500);
    }
  },
};
