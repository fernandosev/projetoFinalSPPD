import express from "express";
const Calendar = require("./../models/Calendar");

module.exports = {
  async add(request: express.Request, response: express.Response) {
    const {
      user,
      vacine,
      date,
      hour,
      Observations,
      doses,
      frequency,
      interval,
    } = request.body;

    const schedule: typeof Calendar = [];

    const addOnCalendar = async (datei: Date, dose: Number) => {
      try {
        const calendar = await Calendar.create({
          user,
          vacine,
          date: datei,
          hour,
          Observations,
          dose,
          status: "Agendada",
        });

        schedule.push(calendar);
      } catch (err) {
        return response.status(500).json("Internal server error");
      }
    };

    if (frequency === "dias") {
      let newDate = new Date(date);
      for (let i = 0; i < doses; i++) {
        await addOnCalendar(newDate, i + 1);
        newDate.setDate(newDate.getDate() + interval);
      }
    } else if (frequency === "semanas") {
      let newDate = new Date(date);
      for (let i = 0; i < doses; i++) {
        await addOnCalendar(newDate, i + 1);
        newDate.setDate(newDate.getDate() + interval * 7);
      }
    } else if (frequency === "meses") {
      let newDate = new Date(date);
      for (let i = 0; i < doses; i++) {
        await addOnCalendar(newDate, i + 1);
        newDate.setDate(newDate.getDate() + interval * 30);
      }
    } else {
      let newDate = new Date(date);
      for (let i = 0; i < doses; i++) {
        await addOnCalendar(newDate, i + 1);
        newDate.setDate(newDate.getDate() + interval * 365);
      }
    }

    return response.json(schedule).status(200);
  },

  async getAll(request: express.Request, response: express.Response) {
    try {
      const calendar: typeof Calendar = await Calendar.find({})
        .populate("vacine")
        .populate("user");

      return response.json({
        calendar,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async getByStatus(request: express.Request, response: express.Response) {
    try {
      const status = request.params.status;
      const calendar: typeof Calendar = await Calendar.find({ status })
        .populate("vacine")
        .populate("user");

      return response.json({
        calendar,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async updateStatus(request: express.Request, response: express.Response) {
    const { _id, status } = request.body;

    try {
      const calendar: typeof Calendar = await Calendar.updateOne(
        { _id },
        { status }
      );

      return response.json({
        calendar,
      });
    } catch (err) {
      return response.status(500);
    }
  },
};
