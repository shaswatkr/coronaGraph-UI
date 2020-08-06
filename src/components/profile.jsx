import React, { Component } from "react";

class Profile extends Component {
    state = {
        nodeDetail: [],
        nearestMostInfectedPersons: []
    };

    componentDidMount() {
        var searchSSN = localStorage.getItem("searchSSN")
        console.log(searchSSN);

        let limit = "10";
        let abc = "abc";
        let zyx = "zyx";

        fetch("http://localhost:61089/api/Graph/GetNearestMostInfectedPerson?ssn=" + searchSSN + "&limit=" + limit + "&abc=" + abc + "&zyx=" + zyx, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(JSON.stringify(result));
                this.setState({ nearestMostInfectedPersons: result });
            })
            .catch(({ message }) => {
                console.log(message);
            })

        fetch("http://localhost:61089/api/Graph/GetNodeDetails?ssn=" + searchSSN, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(JSON.stringify(result));
                this.setState({ nodeDetail: result });
            })
            .catch(({ message }) => {
                console.log(message);
            })

        localStorage.removeItem("searchSSN");
    }

    render() {
        return (
            <div className="container my-4">
                <div className="card ml-2">
                    <div className="card-body">
                        <h4 className="card-title"> Search Details </h4>
                        <hr />

                        <div class="card-body">
                            {this.state.nodeDetail.map((person, index) => {
                                return (
                                    <div key={index}>
                                        <div className="row">
                                            <div className="col">
                                                <h5 class="card-title"> {person.name} </h5>
                                                <h6 class="card-title"> ({person.ssn}) </h6>
                                                <h6 class="card-title"> {person.address} </h6>
                                            </div>
                                            <div className="col">
                                                <h2 class="card-title text-danger"> Score: {Math.round(person.score * 100) / 100}</h2>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <p class="card-text"> Covid Infected People near you </p>
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
                    </div>
                </div>
            </div >
        );
    }
}

export default Profile;
