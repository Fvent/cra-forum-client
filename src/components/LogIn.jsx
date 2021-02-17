import React from 'react';
import { Redirect } from 'react-router-dom';

const NVR = "Error occured on server";

export class LogIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            jsonData : {}
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormChange(event){
        var nam = event.target.name;
        var val = event.target.value;
        this.setState({
            [nam]: val
        });
        
    }

    handleFormSubmit(event){
        event.preventDefault();
        var payload = {'name': this.state.username, 'password': this.state.password};
        console.log(payload);
        var http = new XMLHttpRequest();
        var url = 'http://localhost:1515/login';
        http.open("POST", url);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify(payload));
        http.onreadystatechange = () => {
            
        if(http.responseText === NVR){
            console.log(NVR);
        }else{
            console.log(http.responseText);
            this.props.parentCallback(true);
        }
            
        }
        document.getElementById('login-form').reset();
    }
    render(){
        return (<div id="login">
            <h1>Login</h1>
            
            <form id="login-form" onSubmit={this.handleFormSubmit} > 
                <input type="text" name="username" id="username" onChange={this.handleFormChange} />
                <input type="password" name="password" id="password" onChange={this.handleFormChange} />
                <button type="submit">submit</button>
            </form>

            
        </div>);
    }
}