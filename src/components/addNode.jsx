import React, { Component } from "react";
import { GraphContext } from "../context";

class AddNode extends Component {
    static contextType = GraphContext;

    state = {
        name: "",
        ssn: "",
        address: "",
        state: "",
        city: "",
        zip: "",
        covidPositive: "",
        symptoms: ""
    }

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        const { storeSSN } = this.context;

        console.log(
            this.state.name + ", " +
            this.state.ssn + ", " +
            this.state.address + ", " +
            this.state.state + ", " +
            this.state.city + ", " +
            this.state.zip + ", " +
            this.state.covidPositive + ", " +
            this.state.symptoms
        );

        let ssn = this.state.ssn;
        let name = this.state.name;
        let address = this.state.address + ", " + this.state.city + ", " + this.state.state + ", " + this.state.zip;
        let showingSymptoms = this.state.symptoms;
        let covidInfected = this.state.covidPositive

        fetch("http://localhost:61089/api/Graph/AddPersonNode?ssn=" + ssn + "&name=" + name + "&address=" + address + "&showingSymptoms=" + showingSymptoms + "&covidInfected=" + covidInfected, {
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

        storeSSN(this.state.ssn);

        this.props.history.push('/dashboard/add2')
    }


    render() {
        const {
            cityArray
        } = this.context;

        return (
            <div className="container my-4" >
                <div className="card">
                    <div className="card-body p-4">
                        <div className="was-validated">
                            <h3 className="card-title"> Add new Node </h3>
                            <hr />

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="name"> Name </label>
                                    <input type="text" className="form-control" name="name" onChange={this.handleChange} placeholder="Who are you??" required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="ssn"> SSN </label>
                                    <input type="text" className="form-control" name="ssn" onChange={this.handleChange} placeholder="SSN" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address"> Address </label>
                                <input type="text" className="form-control" name="address" onChange={this.handleChange} placeholder="1234 Main St" required />
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="state"> State </label>
                                    <select name="state" className="custom-select" onChange={this.handleChange} required>
                                        {Object.keys(cityArray).map(state => {
                                            if (state === "Choose State....")
                                                return <option key="" value=""> {state} </option>
                                            else
                                                return <option key={state} value={state}> {state} </option>
                                        })}
                                    </select>
                                </div>

                                <div className="form-group col-md-4">
                                    <label htmlFor="city"> City </label>
                                    <select name="city" className="custom-select" onChange={this.handleChange} disabled={this.state.state === "" ? true : false} required>
                                        {this.state.state === "" ?
                                            <option value=""> Select State for dropdown </option>
                                            :
                                            cityArray[this.state.state].map(city => <option key={city} value={city}> {city} </option>)
                                        }
                                    </select>
                                </div>

                                <div className="form-group col-md-2">
                                    <label htmlFor="zip"> Zip </label>
                                    <input type="text" className="form-control" name="zip" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="covidPositive"> Covid Infected?? </label>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" name="covidPositive" onChange={this.handleChange} value="yes" id="covidYes" required />
                                        <label className="custom-control-label" htmlFor="covidYes"> Yes </label>
                                    </div>
                                    <div className="custom-control custom-radio mb-3">
                                        <input type="radio" className="custom-control-input" name="covidPositive" onChange={this.handleChange} value="no" id="covidNo" required />
                                        <label className="custom-control-label" htmlFor="covidNo"> No </label>
                                    </div>
                                </div>


                                <div className="form-group col-md-6">
                                    <label htmlFor="symptoms"> Showing Symptoms?? </label>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" name="symptoms" onChange={this.handleChange} value="yes" id="symptomsYes" required />
                                        <label className="custom-control-label" htmlFor="symptomsYes"> Yes </label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" name="symptoms" onChange={this.handleChange} value="no" id="symptomsNo" required />
                                        <label className="custom-control-label" htmlFor="symptomsNo"> No </label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="custom-control custom-checkbox mb-3">
                                    <input className="custom-control-input" type="checkbox" id="gridCheck" required />
                                    <label className="custom-control-label" htmlFor="gridCheck" > I agree that all Data provided by me above is correct </label>
                                </div>
                            </div>

                            <button onClick={this.handleSubmit} className="button btn-block btn-lg" style={{ verticalAlign: "middle" }}><span> Proceed </span></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNode;
