import React from 'react';
import forge from 'node-forge';
import dotenv from 'dotenv';
dotenv.config();

const NVR = "Error occured on server";

export class LogIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            jsonData : {}
        }
        this.publicKey = forge.pki.publicKeyFromPem(process.env.REACT_APP_PUBLIC_KEY);

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
        var payload = {'name': this.state.username, 'password': this.publicKey.encrypt(Buffer.from(this.state.password).toString('base64'))};
        console.log(payload);
        var http = new XMLHttpRequest();
        var url = 'http://localhost:1515/login';
        http.open("POST", url);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify(payload));
        http.onreadystatechange = () => {
            
        if(http.responseText === '[]'){
            console.log('not existing user');
            this.props.parentCallback(false, 'not existing user', '');
        }else{
            // console.log(http.responseText);
            // console.log(JSON.parse(http.responseText.replaceAll('[','').replaceAll(']','')));
            var jobj=JSON.parse(http.responseText.replaceAll('[','').replaceAll(']',''));

            this.props.parentCallback(true, '', jobj);
        }
            
        }
        document.getElementById('login-form').reset();
    }
    render(){
        return (<div id="login">
            <h1>Login</h1>
            
            <form id="login-form" className="form-group" onSubmit={this.handleFormSubmit} >
                <div className="label-control">
                    <label for="username" className="form-label"><h4>Username:&nbsp;&nbsp;</h4></label>
                    <input type="text" className="form-control" name="username" id="username" onChange={this.handleFormChange} />    
                </div> 
                <div className="label-control">
                    <label for="password" className="form-label"><h4>Password:&nbsp;&nbsp;</h4></label>
                    <input type="password" className="form-control" name="password" id="password" onChange={this.handleFormChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            
        </div>);
    }
}