import React, { Component } from 'react';
import { locationData } from "../data";

class AddLocation extends Component {
    state = {
        personLOC: "",
        dateMet: "",
        locations: [],
        locMet: []
    }

    componentDidMount() {
        let locations = [];
        locationData.forEach((item) => {
            const product = { ...item };
            locations = [...locations, product];
        });
        this.setState({ locations: locations });
    }

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (param) => {
        let d = this.dateFormater(this.state.dateMet);

        let nodeSSN = localStorage.getItem("ssn");

        console.log(nodeSSN + ", " + this.state.personLOC + ", " + d);

        let tempLocation = [...this.state.locations];
        var locationDate;
        tempLocation.map(
            loc => {
                if (loc.locationId === this.state.personLOC)
                    locationDate = loc.City + ", " + loc.State + " :: " + d;
            }
        )
        this.state.locMet.push(locationDate);

        let ssn = nodeSSN;
        let location = this.state.personLOC;
        let date = d;

        fetch("http://localhost:61089/api/Graph/CreateVisitRelationship?ssn=" + ssn + "&locationId=" + location + "&dateVisited=" + date, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
            })
            .catch(({ message }) => {
                console.log(message);
            })

        alert("Your response has been recorded Successfully!!\n Thank You..")

        if (param === "more")
            this.props.history.push('/dashboard/add3');
        else {
            localStorage.removeItem("ssn");
            this.props.history.push('/dashboard/');
        }
    }

    dateFormater = (edate) => {
        var myDate = new Date(edate);
        var d = myDate.getDate().toString();
        var m = myDate.getMonth();
        m += 1;
        m = m.toString();
        var y = myDate.getYear();
        y = y.toString().substr(-2);

        if (m.length === 1) {
            m = "0" + m;
        }
        if (d.length === 1) {
            d = "0" + d;
        }

        var newdate = (m + "-" + d + "-" + y);
        return newdate;
    }

    render() {
        return (<div className="container my-4" >
            <div className="card">
                <div className="card-body p-4">
                    <div className="was-validated">
                        <h3 className="card-title"> Covid Relationship Data </h3>
                        <hr />

                        <ul class="list-group">
                            {this.state.locMet.map(loc => <li class="list-group-item" key={loc}> {loc} </li>)}
                        </ul>
                        <br />

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="personLOC"> Location </label>
                                <select name="personLOC" className="custom-select" onChange={this.handleChange} required>
                                    <option value=""> Where did you Meet???? </option>
                                    {this.state.locations.map(loc => <option key={loc.locationId} value={loc.locationId}> {loc.Name + ", " + loc.City + ", " + loc.State} </option>)}
                                </select>
                            </div>

                            <div className="form-group col-md">
                                <label htmlFor="dateMet"> Date Met </label>
                                <input type="date" className="form-control" name="dateMet" onChange={this.handleChange} required />
                            </div>
                        </div>

                        <div className="row">
                            <button onClick={() => this.handleSubmit("more")} className="addMore col-md-6 button btn-block btn-lg" style={{ verticalAlign: "middle" }}><span> Add more </span></button>
                            <button onClick={() => this.handleSubmit("done")} className="col-md button btn-block btn-lg btn-success" style={{ verticalAlign: "middle" }}><span> Done </span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default AddLocation;