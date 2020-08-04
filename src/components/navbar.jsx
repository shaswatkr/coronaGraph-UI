import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
    state = {};
    render() {
        return (
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark">

                <Link className="navbar-brand mx-5" to="/dashboard"> CLB </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse ml-5" id="navbarNav">
                    <div className="navbar-nav">
                        <NavLink exact to="/dashboard" className="nav-item nav-link" activeClassName="active"> Home </NavLink>
                        <NavLink exact to="/dashboard/chart" className="nav-item nav-link" activeClassName="active"> Charts </NavLink>
                        <NavLink to="/dashboard/add" className="nav-item nav-link" activeClassName="active"> Add New </NavLink>
                        <NavLink to="/dashboard/profile" className="nav-item nav-link" activeClassName="active"> Profile </NavLink>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
