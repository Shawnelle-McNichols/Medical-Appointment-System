import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        axios.post('http://localhost:5000/login', { email, password })
            .then(result => {
                const { token, user } = result.data;
                console.log(result.data);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setEmail('');
                setPassword('');
                navigate('/patient-dashboard');
            })
            .catch(err => {
                console.log(err)
                alert("The email or password is incorrect!");
            })
    };

    return (
        <div className="form w-100 m-auto">
            <form onSubmit={handleSubmit}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong" >
                                <div className="card-body p-5">
                                    <h3 className="mb-5">Login</h3>
                                    {error && <p>{error}</p>}
                                    <div className="form-group ">
                                        <label className="form-label d-flex" htmlFor="email" >Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            className="form-control form-control-lg"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label d-flex" htmlFor="password" >Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            className="form-control form-control-lg"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required />
                                        <p className="txt-sml">Use 8 or more characters with a mix of letters, numbers & symbols</p>
                                    </div>

                                    <button className="btn btn-main btn-lg btn-block" type="submit" >Login</button>
                                    <p>Don't have an account? <Link to="/register" className="no-btn">Register now</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}
export default Login;