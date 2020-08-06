import React, { Component } from 'react';
import { personData } from "../data";
import { GraphContext } from "../context";

class AddRelation extends Component {
    static contextType = GraphContext;

    state = {
        personSSN: "",
        personLOC: "",
        dateMet: "",
        person: []
    }

    componentDidMount() {
        let person = [];
        personData.forEach((item) => {
            const product = { ...item };
            person = [...person, product];
        });
        this.setState({ person: person });
    }

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = (param) => {
        const { nodeSSN } = this.context;
        console.log(nodeSSN + ", " + this.state.personSSN + ", " + this.state.personLOC + ", " + this.state.dateMet);

        let ssn1 = this.state.personSSN;
        let ssn2 = nodeSSN;
        let location = this.state.personLOC;
        let date = this.state.dateMet;

        fetch("http://localhost:61089/api/Graph/CreateVisitRelationship?ssn1=" + ssn1 + "&ssn2=" + ssn2 + "&locationId=" + location + "&dateVisited=" + date, {
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

        if (param === "more")
            this.props.history.push('/dashboard/add2')
        else
            this.props.history.push('/dashboard')
    }

    render() {
        return (
            <div className="container my-4" >
                <div className="card">
                    <div className="card-body p-4">
                        <div className="was-validated">
                            <h3 className="card-title"> Covid Relationship Data </h3>
                            <hr />

                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    <label htmlFor="personSSN"> Person Met </label>
                                    <select name="personSSN" className="custom-select" onChange={this.handleChange} required>
                                        <option value=""> Whom did you Meet???? </option>
                                        {this.state.person.map(person => <option key={person.SSN} value={person.SSN}> {person.Name} </option>)}
                                    </select>
                                </div>

                                <div className="form-group col-md-4">
                                    <label htmlFor="personLOC"> Location </label>
                                    <select name="personLOC" className="custom-select" onChange={this.handleChange} required>
                                        <option value=""> Where did you Meet???? </option>
                                        {this.state.person.map(person => <option key={person.SSN} value={person.Address}> {person.Address} </option>)}
                                    </select>
                                </div>

                                <div className="form-group col-md-3">
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
            </div>
        );
    }
}

export default AddRelation;