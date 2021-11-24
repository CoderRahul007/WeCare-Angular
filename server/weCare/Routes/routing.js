const express = require('express');

const routing = express.Router();
const wecare = require('../Controller/wecare');

routing.post('/users', wecare.registerUser);

routing.post('/users/login', wecare.userLogin);

routing.post('/coaches', wecare.registerCoach);

routing.post('/coaches/login', wecare.coachLogin);

routing.get('/coaches/all', wecare.getAllCoaches);

routing.get('/coaches/:coachId', wecare.getCoach);

routing.get('/users/:userId', wecare.getUser);

routing.post('/users/booking/:userId/:coachId', wecare.makeAppointment);

routing.put('/booking/:bookingId', wecare.rescheduleAppointment);

routing.delete('/booking/:bookingId', wecare.deleteBooking);

routing.get('/coaches/booking/:coachId', wecare.getAppointmentsByCoach);

routing.get('/users/booking/:userId', wecare.getAppointmentsByUser);

routing.all('*', wecare.invalid);

module.exports = routing;
