import React, { Component } from "react";
import Avatar from "../assets/avatar.jpg"

class Login extends Component {
    state = {
        uid: "",
        pwd: ""
    };

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        console.log("User: " + this.state.uid);
        localStorage.setItem("user", this.state.uid);
        localStorage.setItem("uid", this.state.uid);

        if ((this.state.uid == "skuma874") || (this.state.uid == "svijaive") || (this.state.uid == "vahuja8") || (this.state.uid == "naggar30"))
            this.props.history.push('/dashboard');
        else {
            this.props.history.push('/dashboard/profile');
        }
    }

    render() {
        return (
            <div>
                <h1 className="mt-3" style={{ textAlign: "center" }}> Corona Effective Testing </h1>
                <hr />

                <form className="login">
                    <div class="imgcontainer">
                        <img src={Avatar} alt="Avatar" class="avatar" />
                    </div>

                    <hr />

                    <div class="container">
                        <label for="uId"><strong> MS Id </strong></label>
                        <input onChange={this.handleChange} type="text" placeholder="Enter MS Id...." name="uid" required />

                        <label for="pwd"><strong> Password </strong></label>
                        <input onChange={this.handleChange} type="password" placeholder="Enter Password...." name="pwd" required />

                        <button onClick={this.handleSubmit} className="button btn-block btn-lg btn-login" style={{ verticalAlign: "middle" }}><span> LogIn </span></button>
                        <label>
                            <input type="checkbox" checked="checked" name="remember" id="remember" /> Remember me
                        </label>
                    </div>

                    <div class="container" style={{ backgroundColor: "#f1f1f1" }}>
                        <button type="reset" class="btn-login cancelbtn" id="cancel"> Cancel </button>
                        <span class="psw">Forgot <a href="#">password?</a></span>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
