import express from "express";
const Vacine = require("./../models/Vacine");
const Calendar = require("./../models/Calendar");

module.exports = {
  async add(request: express.Request, response: express.Response) {
    const { title, description, doses, frequency, interval } = request.body;

    try {
      const vacine = await Vacine.create({
        title,
        description,
        doses,
        frequency,
        interval,
      });

      return response.json(vacine);
    } catch (err) {
      return response.status(500).json("Internal server error");
    }
  },

  async getAll(request: express.Request, response: express.Response) {
    try {
      const vacines: typeof Vacine = await Vacine.find({});

      return response.json({
        vacines,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async delete(request: express.Request, response: express.Response) {
    const _id = request.params.id;

    try {
      await Vacine.remove({ _id });
      await Calendar.remove({ user: _id });

      return response.json({}).status(200);
    } catch (err) {
      return response.status(500);
    }
  },
};
