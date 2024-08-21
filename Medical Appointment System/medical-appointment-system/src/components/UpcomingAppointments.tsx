import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Doctor {
id:number,
name:string;
position:string;
services:string[];
}
interface Props{
    doctors: Doctor[];
}
interface Appointment {
    _id:string;
    patientId: string;
    doctorId: number;
    service: string;
    date:string;
    time:string;
    status:string;
}

function UpcomingAppointments({ doctors }: Props) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5000/appointments/${user._id}/upcoming`)
                .then(response => {
                    setAppointments(response.data);
                })
                .catch(err => {
                    console.error('Error fetching appointments:', err);
                })
        }
    }, [user]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString(undefined, options);
    }

    const handleCancel = (appointmentId: string) => {
        axios.patch(`http://localhost:5000/appointments/${appointmentId}/cancel`)
            .then(() => {
                setAppointments(prev => prev.map((appointment: Appointment) =>
                    appointment._id === appointmentId ? { ...appointment, status: 'Canceled' } : appointment
                ))
            })
            .catch(err => {
                console.error('Error canceling appointment:',err);
            });
    }
    
    const updateAppointment = (appointmentId: string) => {
        navigate(`/update-book/${appointmentId}`);
    }

    return (
        <div>
            <h5 className="h5 d-flex justify-content-start">Upcoming Appointments</h5>
            <div className="card card-2">
                <div className="row row-3">
                    {appointments.length > 0 ? (
                        <ul>
                            {appointments.map((appointment: any) => {
                                const doctor = doctors.find((doc:Doctor) => doc.id === appointment.doctorId);
                                return (
                                    <div className="row">
                                        <div className="col d-flex justify-content-start">
                                            <li key={appointment._id} className="list-group-item">
                                                <p><b>{formatDate(appointment.date)}</b></p>
                                                <p>{appointment.time}</p>
                                                <p>{doctor?.name}</p>
                                                <small>{doctor?.position}</small>
                                            </li>
                                            <div className="col">
                                                <button className="btn btn-main" onClick={() => updateAppointment(appointment._id)}>Update</button>
                                                <button className="btn btn-main btn-sec" onClick={() => handleCancel(appointment._id)}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </ul>
                    ) : (
                        <div className="row ">
                            <div className="col">
                                You have no upcoming appointments!
                            </div>
                            <div className="col">
                                <button className="btn btn-main"><Link to="/book">Book an Appointment</Link></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}
export default UpcomingAppointments;