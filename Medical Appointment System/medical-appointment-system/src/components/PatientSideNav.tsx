import { Link, useNavigate } from "react-router-dom";

function PatientSideNav() {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }
    return (
        <div>
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-body" >
                <h5>Medical Clinic</h5>
                <ul className="nav nav-links mb-auto">
                    <li className="side">
                        <Link to="/patient-dashboard">Home</Link>
                    </li>
                    <li>
                        <a href="#" className="nav-link link-body-emphasis ">
                            Appointments
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link link-body-emphasis">
                            Analysis
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link link-body-emphasis">
                            Reports
                        </a>
                    </li>
                </ul>
                <ul className="nav nav-links">
                    <li className="side"><button onClick={handleLogout} className="no-btn">Logout</button></li>
                </ul>
            </div>
        </div>
    )
}
export default PatientSideNav;