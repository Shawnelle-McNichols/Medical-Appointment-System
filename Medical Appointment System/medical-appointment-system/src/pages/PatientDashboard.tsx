import { useEffect } from "react";
import AppointmentHistory from "../components/AppointmentHistory";
import PatientDetails from "../components/PatientDetails";
import PatientSideNav from "../components/PatientSideNav";
import UpcomingAppointments from "../components/UpcomingAppointments";

const doctors = [
    { id: 1, name: 'Dr. Samantha Singh', position: 'General Practitioner', services: ['Consultation', 'Vaccination', 'Chronic Disease Management'] },
    { id: 2, name: 'Dr. Michelle James', position: 'General Practitioner', services: ['Consultation', 'Vaccination', 'Chronic Disease Management'] },
    { id: 3, name: 'Dr. Antoine Joseph', position: 'Pediatrician', services: ['Wellness Visit', 'Sick Visit', 'Specialized Pediatric Care'] }
];


function PatientDashboard() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {

    })

    return (
        <div className="form ">
            <div className="row">
                <div className="col-md-2">
                    <PatientSideNav />
                </div>
                <div className="col-md-8">
                    <span className="mb-0 h1 d-flex justify-content-start">Welcome, {user.firstname}</span>
                    <div className="row my-3">
                        <div className="col">
                            <UpcomingAppointments doctors={doctors}/>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col">
                            <AppointmentHistory doctors={doctors}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <PatientDetails />
                </div>
            </div>
        </div>
    )
}
export default PatientDashboard;