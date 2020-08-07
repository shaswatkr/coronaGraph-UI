import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import SignOff from "../assets/signoff.jpg";

class Navbar extends Component {
    state = {
        searchSSN: "",
        userID: ""
    };

    componentDidMount() {
        this.setState({ userID: localStorage.getItem("user") });

        console.log("UserID: " + this.state.userID);
    }

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSearch = () => {
        const { history } = this.props;
        localStorage.setItem("searchSSN", this.state.searchSSN);
    }

    render() {
        if ((this.state.userID == "skuma874") || (this.state.userID == "svijaive") || (this.state.userID == "vahuja8") || (this.state.userID == "naggar30")) {
            return (
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark">

                    <Link className="navbar-brand mx-5" to="/dashboard"> Corona Effective Testing </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse ml-5" id="navbarNav">
                        <div className="navbar-nav mr-auto">
                            <NavLink exact to="/dashboard" className="nav-item nav-link" activeClassName="active" title="Dashboard"> Dashboard </NavLink>
                            <NavLink exact to="/dashboard/chart" className="nav-item nav-link" activeClassName="active" title="Corona Heatmap"> Corona Heatmap </NavLink>
                            <NavLink to="/dashboard/add1" className="nav-item nav-link" activeClassName="active" title="Register"> Register </NavLink>
                        </div>

                        <form className="form-inline mr-5 my-2 my-lg-0">
                            <input onChange={this.handleChange} name="searchSSN" className="form-control mr-sm-2" type="search" placeholder="Search SSN...." aria-label="Search" />
                            {
                                this.state.searchSSN === "" ?
                                    <NavLink to="/dashboard/profile" onClick={this.handleSearch} className="btn btn-info my-2 my-sm-0 disabled"> Search </NavLink>
                                    :
                                    <NavLink to="/dashboard/profile" onClick={this.handleSearch} className="btn btn-info my-2 my-sm-0" title="Search"> Search </NavLink>
                            }
                        </form>

                        <NavLink exact to="/">
                            <img src={SignOff} style={{ width: "40px", height: "40px" }} title="Log Off!!" alt="Log Off" />
                        </NavLink>

                    </div>
                </nav>
            );
        }
        else {
            return (
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark">

                    <Link className="navbar-brand mx-5" to="/dashboard"> Corona Effective Testing </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse ml-5" id="navbarNav">
                        <div className="navbar-nav mr-auto">
                            <NavLink to="/dashboard/profile" className="nav-item nav-link" activeClassName="active" title="Personal Info"> Personal Info </NavLink>
                            <NavLink exact to="/dashboard/chart" className="nav-item nav-link" activeClassName="active" title="Corona Heatmap"> Corona Heatmap </NavLink>
                            <NavLink to="/dashboard/add1" className="nav-item nav-link" activeClassName="active" title="Register"> Register </NavLink>
                        </div>

                        <NavLink exact to="/">
                            <img src={SignOff} style={{ width: "40px", height: "40px" }} title="Log Off!!" alt="Log Off" />
                        </NavLink>

                    </div>
                </nav>
            );
        }
    }
}

export default Navbar;
