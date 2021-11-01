const express = require('express');
//const db = require('../model/db');
const myController = require('../Controller/wcapp');
const router = express.Router();

/* GET Requests. */
router.get('/coaches/all', myController.getCoaches);
router.get('/coaches/:coachId', myController.getCoachById);
router.get('/users/:userId', myController.getUserById);
router.get('/Coaches/booking/:coachId', myController.appointmentsByCoachId);
router.get('/users/booking/:userId', myController.appointmentsByUserId);

/* POST Requests. */
router.post('/users',myController.register);
router.post('/users/login',myController.login);
router.post('/coaches',myController.registerAsCoach);
router.post('/coaches/login',myController.loginAsCoach);
router.post('/users/booking/:userId/:coachId', myController.makeAppointment);

/* PUT Requests */
router.put('/booking/:bookingId', myController.reschedule);

// // Delete Requests
router.delete('/booking/:bookingId', myController.cancelAppointment);


module.exports = router;