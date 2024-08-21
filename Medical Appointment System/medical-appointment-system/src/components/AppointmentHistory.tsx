import axios from "axios";
import { useEffect, useState } from "react";

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

function AppointmentHistory({ doctors }: Props) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5000/appointments/${user._id}/history`)
                .then(response => {
                    setAppointments(response.data);
                })
                .catch(err => {
                    console.error('Error fetching appointment history:', err);
                })
        }
    }, [user]);

    const indexOfLastAppointment = currentPage * itemsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

    const totalPages = Math.ceil(appointments.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h4 className="h5 d-flex justify-content-start">Appointment History</h4>
            <div className="card card-2 card-history">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Physician</th>
                            <th>Service</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAppointments.map((appointment) => {
                            const doctor = doctors.find((doc: Doctor) => doc.id === appointment.doctorId);
                            let statusStyle = {};
                            if (appointment.status === 'Completed') {
                                statusStyle = { color: 'green' };
                            } else if (appointment.status === 'Canceled') {
                                statusStyle = { color: 'red' };
                            } else {
                                return null;
                            }
                            return (
                                <tr key={appointment._id}>
                                    <td>{new Date(appointment.date).toLocaleDateString()}</td>
                                    <td>{appointment.time}</td>
                                    <td>{doctor?.name}</td>
                                    <td>{appointment.service}</td>
                                    <td style={statusStyle}>{appointment.status}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                <nav>
                    <ul className="pagination">
                        {Array.from({length: totalPages}, (_,index) => (
                            <li key={index} >
                                <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                            </li>
                        ))}

                    </ul>
                </nav>
            </div>
        </div>

    )
}
export default AppointmentHistory;