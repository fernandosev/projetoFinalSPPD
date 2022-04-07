import express from "express";

const UserController = require("./controllers/UserController");
const VacineController = require("./controllers/VacineController");
const CalendarController = require("./controllers/CalendarController");

const routes = express.Router();

// Add a new user
routes.post("/vaccination/user/add", UserController.add);

// Get users
routes.get("/vaccination/users", UserController.getAll);

// Get user by id
routes.get("/vaccination/user/:id", UserController.get);

// Get user by id
routes.delete("/vaccination/user/:id", UserController.delete);

// Add a new vacine
routes.post("/vaccination/vacine/add", VacineController.add);

// Get vacines
routes.get("/vaccination/vacines", VacineController.getAll);

// Get user by id
routes.delete("/vaccination/vacine/:id", VacineController.delete);

// Add on Calendar
routes.post("/vaccination/calendar/add", CalendarController.add);

// Get calendar
routes.get("/vaccination/calendar", CalendarController.getAll);

// Get vacines by Status
routes.get(
  "/vaccination/calendar/status/:status",
  CalendarController.getByStatus
);

// Update calendar status
routes.put("/vaccination/calendar", CalendarController.updateStatus);

module.exports = routes;
