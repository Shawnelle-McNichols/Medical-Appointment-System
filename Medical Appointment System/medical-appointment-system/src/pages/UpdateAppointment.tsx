import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import PatientSideNav from "../components/PatientSideNav";
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const doctors = [
    { id: 1, name: 'Dr. Samantha Singh', position: 'General Practitioner', services: ['Consultation', 'Vaccination', 'Chronic Disease Management'] },
    { id: 2, name: 'Dr. Michelle James', position: 'General Practitioner', services: ['Consultation', 'Vaccination', 'Chronic Disease Management'] },
    { id: 3, name: 'Dr. Antoine Joseph', position: 'Pediatrician', services: ['Wellness Visit', 'Sick Visit', 'Specialized Pediatric Care'] }
];

const availTimes = ['09:00 AM - 09:30 AM',
    '10:00 AM - 10:30 AM',
    '11:00 AM - 11:30 AM',
    '02:00 PM - 02:30 PM',
    '03:00 PM - 03:30 PM'];

function UpdateAppointment() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const { id } = useParams<{ id: string }>();
    const [appointment, setAppointment] = useState<any>(null);
    const [selectedDoctor, setDoctor] = useState<number | null>(null);
    const [service, setService] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [selectedTime, setTime] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/appointments/${id}`)
            .then(response => {
                setAppointment(response.data);
                setDoctor(response.data.doctorId);
                setDate(new Date(response.data.date));
                setTime(response.data.time);
                setService(response.data.service);
            })
            .catch(err => { console.error("Error fetching appointment:", err) });
        const doctor = doctors.find(doc => doc.id === selectedDoctor);
        if (doctor) {
            setService(doctor.services[0]);
        }
    }, [id]);

    const handleDateChange = (date: Date | null, event?: React.SyntheticEvent<any> | undefined) => {
        if (date) {
            const day = date.getDay();
            if (day !== 0 && day !== 6) {
                setDate(date);
            }
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedAppointment = {
            patientId: user._id,
            doctorId: selectedDoctor,
            service,
            date,
            time: selectedTime,
            status: 'Upcoming'
        };
       // console.log(updatedAppointment);
       //console.log(id);
        axios.put(`http://localhost:5000/appointments/${id}`, updatedAppointment)
            .then(() => {
                alert("Appointment updated successfully! Thank you!")
                setDoctor(null)
                setService('')
                setDate(null)
                setTime('')
                //console.log(updatedAppointment);
                navigate('/patient-dashboard');
            })
            .catch(err => {
                console.error("Error updating appointment:", err)
                alert("Failed to update appointment! Please try again!")
            });
    };

    return (
        <div className="form">
            <div className="row">
                <div className="col-md-2">
                    <PatientSideNav />
                </div>
                <div className="col-md-8">
                    <div className="card card-2">
                        <h3 className="d-flex justify-content-start">Edit Appointment</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-8 col-lg-6 ">
                                    <div className="card shadow-2-strong">
                                        <div className="form-group">
                                            <label className="form-label d-flex" htmlFor="doctor" >Doctor</label>
                                            <select
                                                id="doctor"
                                                className="form-control"
                                                value={selectedDoctor || ''}
                                                onChange={e => setDoctor(Number(e.target.value))}
                                                required>
                                                <option value="">Select a Doctor</option>
                                                {doctors.map(doctor => (
                                                    <option key={doctor.id} value={doctor.id}>
                                                        {doctor.name}, {doctor.position}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label d-flex" htmlFor="service" >Service</label>
                                            <select
                                                id="service"
                                                className="form-control"
                                                value={service}
                                                onChange={e => setService(e.target.value)}
                                                required>
                                                <option value="">Select a Service</option>
                                                {doctors.find(doc => doc.id === selectedDoctor)?.services.map(service => (
                                                    <option key={service} value={service}>
                                                        {service}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="date" >Choose a Date</label>
                                            <DatePicker
                                                id="date"
                                                className="form-control"
                                                selected={date}
                                                onChange={handleDateChange}
                                                filterDate={date => date.getDay() !== 0 && date.getDay() !== 6}
                                                required />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="time">Time</label>
                                            <div>
                                                {availTimes.map(time => (
                                                    <button
                                                        key={time}
                                                        type="button"
                                                        className={`btn ${selectedTime === time ? 'btn-main' : 'btn-sec'}`}
                                                        onClick={() => setTime(time)}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-main">Update Appointment</button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdateAppointment;