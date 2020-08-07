import React, { Component } from "react";
import { locData } from "../data"

class Dashboard extends Component {
    state = {
        highestScore: "",
        data: [],
        tableData: [],
        loc: [],
        locID: [],
        coords: []
    };

    componentDidMount() {
        this.addMapCoords();

        fetch("http://localhost:61089/api/Graph/getInfectedDetails")
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    tableData: result,
                    highestScore: result[0].score
                });
                localStorage.setItem("highestScore", this.state.highestScore);

                let data = [];
                this.state.tableData.forEach((item) => {
                    let risk;
                    if (item.score <= (0.1 * this.state.highestScore)) {
                        risk = <th className="text-success"> NO </th>;
                    }
                    else if ((item.score > (0.1 * this.state.highestScore)) && item.score <= (0.25 * this.state.highestScore)) {
                        risk = <th className="text-info"> LOW </th>;
                    }
                    else if ((item.score > (0.25 * this.state.highestScore)) && item.score <= (0.5 * this.state.highestScore)) {
                        risk = <th className="text-medium"> MEDIUM </th>;
                    }
                    else {
                        risk = <th className="text-danger"> HIGH </th>;
                    }

                    const res = { ...item, risk };
                    data = [...data, res];
                });
                this.setState({ data: data });
            });
    }

    addMapCoords = () => {
        localStorage.removeItem("coords");

        let loc = [];
        locData.forEach((item) => {
            const product = { ...item };
            loc = [...loc, product];
        });
        this.setState({ loc: loc });

        fetch("http://localhost:61089/api/Graph/GetMostInfectedLocation")
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                this.setState({ locID: result });

                let tempLoc = [...this.state.loc];
                this.state.locID.map(lID => {
                    var lat, long;
                    tempLoc.map(
                        loc => {
                            if (lID.locationId === loc.LocationId) {
                                lat = loc.Latitude;
                                long = loc.Longitude
                            }
                        }
                    )
                    this.setState({ coords: [...this.state.coords, { "lat": Number(lat), "lng": Number(long) }] });
                })

                localStorage.setItem("coords", JSON.stringify(this.state.coords));
            })
            .catch(({ message }) => {
                console.log(message);
            })
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
                                <h6 class="card-subtitle mb-2 text-muted"> * Centrality - Measurement of a person's COVID19 spread </h6>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col"> Rank </th>
                                            <th scope="col"> SSN </th>
                                            <th scope="col"> Name </th>
                                            <th scope="col"> Address </th>
                                            <th scope="col"> Centrality </th>
                                            <th scope="col"> Risk </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.data.length !== 0 ?
                                                this.state.data.slice(0, 10).map((result, index) =>
                                                    <tr key={index}>
                                                        <td> {index + 1} </td>
                                                        <td> {result.ssn} </td>
                                                        <td> {result.name} </td>
                                                        <td> {result.address} </td>
                                                        <td scope="row"> {Math.round(result.score * 100) / 100} </td>
                                                        {result.risk}
                                                    </tr>
                                                )
                                                :
                                                <tr class="text-center">
                                                    <td colspan="5" class="spinner-border" style={{ color: "#4f5f76", marginTop: "30%", marginLeft: "130%", marginBottom: "30%", width: "10rem", height: "10rem" }} role="status">
                                                        <span class="sr-only">Loading...</span>
                                                    </td>
                                                </tr>
                                        }
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
                                    <hr />

                                    <table className="card-text table font-weight-bolder covidDetails">
                                        <tbody>
                                            <tr className="text-danger">
                                                <th scope="col"> Confirmed </th>
                                                <th scope="col"> 144 </th>
                                            </tr>
                                            <tr className="text-primary">
                                                <th scope="col"> Active </th>
                                                <th scope="col"> 115 </th>
                                            </tr>
                                            <tr className="text-success">
                                                <th scope="col"> Recovered </th>
                                                <th scope="col"> 29 </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 row">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title highlight font-weight-bold"> Covid Prevention Guidelines </h5>
                                    <hr />

                                    <table className="card-text font-weight-bold table table-hover">
                                        <tr><th> Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water. </th></tr>
                                        <tr><th> Maintain at least 1 metre (3 feet) distance between yourself and others. </th></tr>
                                        <tr><th> Stay home and self-isolate even with minor symptoms such as cough, headache, mild fever, until you recover. </th></tr>
                                        <tr><th>
                                            <a href="https://www.covid19india.org/" class="card-link ml-4"> COVID19 India </a>
                                            <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public" class="card-link mr-5 float-right"> WHO Public Advice </a>
                                        </th></tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Dashboard;
