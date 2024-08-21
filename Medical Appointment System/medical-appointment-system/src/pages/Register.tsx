import React, {  useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const navigate = useNavigate();



    /*const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({...formData,[name]: value});
    };*/

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        axios.post('http://localhost:5000/register', { firstname, lastname, gender, 
            birthdate, address, phone, email, password })
            .then(result => {
                console.log('Registration successful', result);
                setFirstName('');
                setLastName('');
                setGender('');
                setBirthdate('');
                setAddress('');
                setPhone('');
                setEmail('');
                setPassword('');
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 ">
                            <div className="card shadow-2-strong" >
                                <div className="card-body p-5">
                                    <h3 className="mb-5">Register</h3>
                                    <div className="d-flex">
                                        <h5>1. Basic info</h5>

                                    </div>
                                    <p className="d-flex">*All fields required unless noted.</p>
                                    <div className="form-group">
                                        <label className="form-label d-flex" htmlFor="firstname" > First name</label>
                                        <input
                                            type="text"
                                            id="firstname"
                                            value={firstname}
                                            className="form-control form-control-lg"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label d-flex" htmlFor="lastname" >Last name</label>
                                        <input
                                            type="text"
                                            id="lastname"
                                            value={lastname}
                                            className="form-control form-control-lg"
                                            onChange={(e) => setLastName(e.target.value)}
                                            required />
                                    </div>
                                    <div className="form-group d-flex align-items-center mb-3" >
                                        <label className="form-label " >What's your gender?</label>
                                        <div className="form-check form-check-inline">
                                            <input
                                                type="radio"
                                                id="male"
                                                name="gender"
                                                value="Male"
                                                className="form-check-input"
                                                checked={gender === 'Male'}
                                                onChange={(e) => setGender(e.target.value)}
                                                required />
                                            <label className="form-check-label" htmlFor="male">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                type="radio"
                                                id="female"
                                                name="gender"
                                                value="Female"
                                                className="form-check-input"
                                                checked={gender === 'Female'}
                                                onChange={(e) => setGender(e.target.value)}
                                                required />
                                            <label className="form-check-label" htmlFor="female">Female</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                type="radio"
                                                id="other"
                                                name="gender"
                                                value="Other"
                                                className="form-check-input"
                                                checked={gender === 'Other'}
                                                onChange={(e) => setGender(e.target.value)}
                                                required />
                                            <label className="form-check-label" htmlFor="other">Other</label>
                                        </div>

                                    </div>
                                    <div className="form-group align-items-center">
                                        <label className="form-label d-flex" htmlFor="birthdate" >What's your date of birth?</label>
                                        <input
                                            type="date"
                                            id="birthdate"
                                            value={birthdate}
                                            className="form-control form-control-lg "
                                            onChange={(e) => setBirthdate(e.target.value)}
                                            required />
                                    </div>
                                    <div className="h5">
                                        <h5 className="d-flex h5">2. Contact info</h5>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label d-flex" htmlFor="address" >Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            value={address}
                                            className="form-control form-control-lg"
                                            onChange={(e) => setAddress(e.target.value)}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label d-flex" htmlFor="phone" >Phone</label>
                                        <input
                                            type="phone"
                                            id="phone"
                                            value={phone}
                                            className="form-control form-control-lg"
                                            onChange={(e) => setPhone(e.target.value)}
                                            required />
                                    </div>
                                    <div className="h5">
                                        <h5 className="d-flex h5">3. Login info</h5>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label d-flex" htmlFor="email" >Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            className="form-control form-control-lg"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label d-flex" htmlFor="password" >Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            className="form-control form-control-lg"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required />
                                    </div>
                                    <button type="submit" className="btn btn-main btn-block">Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Register;