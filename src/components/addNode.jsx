import React, { Component } from "react";

class AddNode extends Component {
    state = {};

    checkStatus = function () {
        console.log("Here");

    };

    render() {
        return (
            <div className="container my-4">
                <div className="card">
                    <div className="card-body p-4">
                        <form className="was-validated">
                            <h4 className="card-title"> Add new Node </h4>
                            <hr />

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input type="email" className="form-control" id="inputEmail4" placeholder="Email" required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Password</label>
                                    <input type="text" className="form-control" id="inputPassword4" placeholder="Password" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputAddress">Address</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputAddress2">Address 2</label>
                                <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" required />
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">City</label>
                                    <input type="text" className="form-control" id="inputCity" required />
                                </div>

                                <div className="form-group col-md-4">
                                    <label htmlFor="inputState">State</label>
                                    <select id="inputState" className="form-control" required>
                                        <option value="">Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>

                                <div className="form-group col-md-2">
                                    <label htmlFor="inputZip">Zip</label>
                                    <input type="text" className="form-control" id="inputZip" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" required />
                                    <label className="form-check-label" htmlFor="gridCheck" > All Data Provided by me is correct </label>
                                </div>
                            </div>
                            {/* <button onClick={this.checkStatus} type="submit" className="btn btn-outline-info btn-lg btn-block"> Sign in </button> */}
                            <button className="button btn-block btn-lg" style={{ verticalAlign: "middle" }}><span>Submit </span></button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNode;
