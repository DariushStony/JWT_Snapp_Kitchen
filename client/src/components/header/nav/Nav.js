import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => {


    return (
        <nav className="navbar navbar-expand-lg navbar-expand-sm navbar-expand-xl navbar-dark  mb-4 nav-custom">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Snapp Kitchen</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;