import { Link } from "react-router-dom";

function PatientDetails() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const birthdate = new Date(user.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    return (
        <div className=" card card-2">
            <div className="d-flex flex-column flex-shrink-0 p-3 " >

                <div className="row-2">
                    <img alt="user.image"></img>
                    <p>{user.firstname} {user.lastname}</p>
                    <p>{age} years</p>
                </div>
                <div className="row-2">
                    <p>{user.gender}</p>
                    <p>{user.address}</p>
                    <p>{user.phone}</p>
                </div>
                <div className="row-2">
                    <button className=" btn btn-dash d-flex justify-content-start">My Profile</button>
                    <button className=" btn btn-dash d-flex justify-content-start">My Visits</button>
                    <button className=" btn btn-dash d-flex justify-content-start">My Medication</button>
                </div>
            </div>
        </div>
    )
}
export default PatientDetails;