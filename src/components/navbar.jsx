import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
    state = { searchSSN: "" };

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSearch = () => {
        localStorage.setItem("searchSSN", this.state.searchSSN);
    }

    render() {
        return (
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark">

                <Link className="navbar-brand mx-5" to="/dashboard"> CLB </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse ml-5" id="navbarNav">
                    <div className="navbar-nav mr-auto">
                        <NavLink exact to="/dashboard" className="nav-item nav-link" activeClassName="active"> Dashboard </NavLink>
                        <NavLink exact to="/dashboard/chart" className="nav-item nav-link" activeClassName="active"> Corona Heatmap </NavLink>
                        <NavLink to="/dashboard/add1" className="nav-item nav-link" activeClassName="active"> Register </NavLink>
                        <NavLink to="/dashboard/profile" className="nav-item nav-link" activeClassName="active"> Personal Info </NavLink>
                    </div>

                    <div class="form-inline mr-5 my-2 my-lg-0">
                        <input onChange={this.handleChange} name="searchSSN" class="form-control mr-sm-2" type="search" placeholder="Search SSN...." aria-label="Search" />
                        <NavLink to="/dashboard/profile" onClick={this.handleSearch} className="btn btn-outline-info my-2 my-sm-0">Search</NavLink>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
