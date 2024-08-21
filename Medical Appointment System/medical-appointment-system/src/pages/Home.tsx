import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="bg-img">
            <nav className="nav">
                <div className="nav-container">
                    <ul className="nav-links">
                        <li ><Link to="/">Home</Link></li>
                        <li ><Link to="/about">Services</Link></li>
                        <li ><Link to="/contact-us">Contact Us</Link></li>
                    </ul>
                </div>
                <button className="btn btn-main"><Link to="/login">Login</Link></button>
            </nav>
            <div className="container">
                <div className="bg-content py-5 text-center">
                    <h1 className="">Medical Clinic</h1>
                    <div className="col-lg-6 mx-auto">
                        <h6 className="lead mb-4">Prioritizing Your Health with Exceptional Care and Excellent Service</h6>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <button type="button" className="btn btn-main btn-lg px-4 gap-3"><Link to="/register">Book an Appointment</Link></button>
                            <button type="button" className="btn btn-sec btn-lg px-4">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;