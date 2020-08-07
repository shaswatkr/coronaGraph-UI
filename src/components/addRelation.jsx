import React, { Component } from 'react';
import { personData } from "../data";
import { GraphContext } from "../context";

class AddRelation extends Component {
    static contextType = GraphContext;

    state = {
        personSSN: "",
        personMet: [],
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
        let nodeSSN = localStorage.getItem("ssn");
        console.log(nodeSSN + ", " + this.state.personSSN);

        let tempPerson = [...this.state.person];
        var person;
        tempPerson.map(
            per => {
                if (per.SSN === this.state.personSSN)
                    person = per.Name;
            }
        )

        this.state.personMet.push(person);

        let ssn1 = this.state.personSSN;
        let ssn2 = nodeSSN;

        fetch("http://localhost:61089/api/Graph/CreateInteractsWithRelationship?ssn1=" + ssn1 + "&ssn2=" + ssn2, {
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
            this.props.history.push('/dashboard/add3')
    }

    render() {
        return (
            <div className="container my-4" >
                <div className="card">
                    <div className="card-body p-4">
                        <div className="was-validated">
                            <h3 className="card-title"> Covid Relationship Data </h3>
                            <hr />

                            <div className="form-group">
                                <label htmlFor="personSSN"> Person Met </label>
                                <ul class="list-group">
                                    {this.state.personMet.map(person => <li class="list-group-item" key={person}> {person} </li>)}
                                </ul>
                                <br />
                                <select name="personSSN" className="custom-select" onChange={this.handleChange} required>
                                    <option value=""> Whom did you Meet???? </option>
                                    {this.state.person.map(person => <option key={person.SSN} value={person.SSN}> {person.Name} </option>)}
                                </select>
                            </div>

                            <div className="row">
                                <button onClick={() => this.handleSubmit("more")} className="addMore col-md-6 button btn-block btn-lg" style={{ verticalAlign: "middle" }}><span> Add more </span></button>
                                <button onClick={() => this.handleSubmit("done")} className="col-md button btn-block btn-lg btn-success" style={{ verticalAlign: "middle" }}><span> Next </span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddRelation;