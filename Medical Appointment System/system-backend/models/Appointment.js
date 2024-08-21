const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: String,
    doctorId: Number,
    service: String,
    date:Date,
    time:String,
    status:String,
});
const AppointmentModel = mongoose.model('appointments', appointmentSchema);
module.exports = AppointmentModel;