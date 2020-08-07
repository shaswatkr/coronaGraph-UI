import React, { Component } from "react";

class Profile extends Component {
    state = {
        nodeDetail: [],
        nearestMostInfectedPersons: [],
        highestScore: "",
        risk: ""
    };

    componentDidMount() {
        var searchSSN = localStorage.getItem("searchSSN");
        var uid = localStorage.getItem("uid");

        if ((uid != "skuma874") && (uid != "svijaive") && (uid != "vahuja8") && (uid != "naggar30")) {
            searchSSN = uid;
        }

        console.log("SearchSSN: " + searchSSN);

        fetch("http://localhost:61089/api/Graph/GetNearestMostInfectedPerson?ssn=" + searchSSN)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                this.setState({ nearestMostInfectedPersons: result });
            })
            .catch(({ message }) => {
                console.log(message);
            })

        fetch("http://localhost:61089/api/Graph/GetNodeDetails?ssn=" + searchSSN)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);

                this.setState({
                    nodeDetail: result,
                    highestScore: localStorage.getItem("highestScore")
                });

                let risk;
                if (this.state.nodeDetail[0].score <= (0.1 * this.state.highestScore)) {
                    risk = <span className="text-success"> NO </span>;
                }
                else if ((this.state.nodeDetail[0].score > (0.1 * this.state.highestScore)) && (this.state.nodeDetail[0].score <= (0.25 * this.state.highestScore))) {
                    risk = <span className="text-info"> LOW </span>;
                }
                else if ((this.state.nodeDetail[0].score > (0.25 * this.state.highestScore)) && (this.state.nodeDetail[0].score <= (0.5 * this.state.highestScore))) {
                    risk = <span className="text-medium"> MEDIUM </span>;
                }
                else {
                    risk = <span className="text-danger"> HIGH </span>;
                }
                this.setState({ risk: risk });
            })
            .catch(({ message }) => {
                console.log(message);
            })

        if ((uid === "skuma874") || (uid === "svijaive") || (uid === "vahuja8") || (uid === "naggar30")) {
            localStorage.removeItem("searchSSN");
        }
    }

    render() {
        return (
            <div className="container my-4">
                <div className="card ml-2">
                    <div className="card-body">
                        <h4 className="card-title"> Personal Details </h4>
                        <hr />

                        {
                            this.state.nodeDetail.length !== 0 ?
                                <>
                                    <div class="card-body">
                                        {this.state.nodeDetail.map((person, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className="row">
                                                        <div className="col">
                                                            <h5 class="card-title"> Name: {person.name} </h5>
                                                            <h6 class="card-title"> SSN: ({person.ssn}) </h6>
                                                            <h6 class="card-title"> Address: {person.address} </h6>
                                                            <h5 class="card-title">
                                                                Showing Symptoms:
                                                    {
                                                                    person.showingSymptoms ?
                                                                        <span className="text-danger"> Yes </span>
                                                                        :
                                                                        <span className="text-success"> No </span>
                                                                } </h5>
                                                        </div>
                                                        <div className="col">
                                                            <h2 class="card-title"> Risk Level: {this.state.risk} </h2>
                                                            <h3 className="card-title">
                                                                Covid Infected:
                                                    {
                                                                    person.covidInfected ?
                                                                        <span className="text-danger"> Yes </span>
                                                                        :
                                                                        <span className="text-success"> No </span>
                                                                }
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <hr />
                                        <h4 class="card-title"> Covid Infected People near you </h4>
                                    </div>
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col"> Rank </th>
                                                <th scope="col"> Name </th>
                                                <th scope="col"> Address </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.nearestMostInfectedPersons.map((person, index) =>
                                                <tr key={index}>
                                                    <td> {index + 1} </td>
                                                    <td> {person.name} </td>
                                                    <td> {person.address} </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </>
                                :
                                <tr class="text-center">
                                    <td colspan="5" class="spinner-border" style={{ color: "#4f5f76", marginTop: "30%", marginLeft: "270%", marginBottom: "30%", width: "10rem", height: "10rem" }} role="status">
                                        <span class="sr-only">Loading...</span>
                                    </td>
                                </tr>
                        }
                    </div>
                </div>
            </div >
        );
    }
}

export default Profile;
