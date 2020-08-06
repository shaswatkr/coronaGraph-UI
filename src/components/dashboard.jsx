import React, { Component } from "react";

class Dashboard extends Component {
    state = {
        tableData: []
    };

    componentDidMount() {
        fetch("http://localhost:61089/api/Graph/getInfectedDetails")
            .then((res) => res.json())
            .then((result) => {
                this.setState({ tableData: result });
            });
    }

    render() {
        return (
            <div className="container-fluid my-4">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card ml-2">
                            <div className="card-body">
                                <h4 className="card-title"> Potential Corona Carriers </h4>
                                <hr />
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col"> Rank </th>
                                            <th scope="col"> SSN </th>
                                            <th scope="col"> Name </th>
                                            <th scope="col"> Address </th>
                                            <th scope="col"> Centrality </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.tableData.map((result, index) =>
                                                <tr key={index}>
                                                    <td> {index + 1} </td>
                                                    <td> {result.ssn} </td>
                                                    <td> {result.name} </td>
                                                    <td> {result.address} </td>
                                                    <th scope="row"> {Math.round(result.score * 100) / 100} </th>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-md mt-4 mt-md-0 mx-4">
                        <div className="row">
                            <div className=" card">
                                <div className="card-body">
                                    <h5 className="card-title highlight font-weight-bold"> Covid Info - India </h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="card-link">Card link</a>
                                    <a href="#" className="card-link">Another link</a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 row">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title highlight font-weight-bold">Card title</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="card-link">Card link</a>
                                    <a href="#" className="card-link">Another link</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
