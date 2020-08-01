import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import AddNode from "./components/addNode";
import Profile from "./components/profile";
import Navbar from "./components/navbar";
import Chart from "./components/chart";

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/dashboard">
                    <Navbar />
                    <Switch>
                        <Route exact path="/dashboard/" component={Dashboard} />
                        <Route exact path={"/dashboard/chart"} component={Chart} />
                        <Route exact path={"/dashboard/add"} component={AddNode} />
                        <Route exact pate={"/dashboard/profile"} component={Profile} />
                    </Switch>
                </Route>
            </Switch>
        </>
    );
}

export default App;
