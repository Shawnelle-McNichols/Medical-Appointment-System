const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/User');
const AppointmentModel = require('./models/Appointment');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/medical-appointment-system', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB Connected!');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    })

const JWT_KEY = 'password';
//Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).json("User not found!");
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ id: user._id, email: user.email }, JWT_KEY, { expiresIn: '1h' });
                    res.json({ token, user })
                } else {
                    res.status(401).json("The email or password is incorrect!")
                }
            })
        })
        .catch(err => res.status(500).json(err))
})
//Register
app.post('/register', (req, res) => {
    const { firstname, lastname, gender,
        birthdate, address, phone, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hashedPassword => {
            const newUser = new UserModel({
                firstname, lastname, gender,
                birthdate, address, phone, email, password: hashedPassword
            });

            newUser.save()
                .then(users => res.json(users))
                .catch(err => res.status(500).json(err))
        })
})
//View profile
//Update profile
/** ================================APPOINTMENT ENDPOINTS ============================================= */

//Book an Appointment
app.post('/appointments', (req, res) => {
    const newAppointment = new AppointmentModel(req.body);
    newAppointment.save()
        .then(() => res.json({ message: 'Appointment booked.' }))
        .catch(err => res.status(400).jsom({ error: 'Failed to book appointment.', details: err }));
})
//Retrieve users upcoming appointment
app.get('/appointments/:patientId/upcoming', (req, res) => {
    const { patientId } = req.params;

    AppointmentModel.find({ patientId, status: 'Upcoming' })
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json(err))
})
//Cancel an upcoming appointment
app.patch('/appointments/:appointmentId/cancel', (req, res) => {
    const { appointmentId } = req.params;
    AppointmentModel.findByIdAndUpdate(appointmentId, { status: 'Canceled' }, { new: true })
        .then(appointment => res.send(appointment))
        .catch(err => res.status(404).send('Appointment not found!'))
})
//Get appointment by id
app.get('/appointments/:id', (req,res) => {
    AppointmentModel.findById(req.params.id)
    .then(appointment => res.send(appointment))
    .catch(err => res.status(400).json(err))
})
//Update an upcoming appointment
app.put('/appointments/:id', (req,res) => {
    console.log(req.body);
    AppointmentModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedAppointment => res.send(updatedAppointment))
    .catch(err => res.status(400).json(err))
})

//Retreive users appointment history
app.get('/appointments/:patientId/history', (req, res) => {
    const { patientId } = req.params;
    AppointmentModel.find({ patientId })
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json(err))
})

//START THE SERVER
app.listen(5000, () => {
    console.log("Server is running");
})