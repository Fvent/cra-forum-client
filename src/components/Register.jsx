import React from 'react';
import forge from 'node-forge';
import dotenv from 'dotenv';

export class Register extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            alias: '',
            password: ''
        }

        dotenv.config();

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

        console.log(this.state.name);
        console.log(this.state.alias);
        console.log(this.state.password);
        var encodedPassword = Buffer.from(this.state.password).toString('base64');
        var encryptedPassword = this.publicKey.encrypt(encodedPassword);
        console.log(encodedPassword+'---------------------------\n'+encryptedPassword);
        var payload = {"name": this.state.name, "alias": this.state.alias, "password":encryptedPassword};

        var url = "http://localhost:1515/adduser";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(payload));
        xhr.onreadystatechange = () => {
            console.log(xhr.responseText);
        }


        document.getElementById("register-form").reset();
    }

    render(){
        return (<div id="register-component">
            <h2>Register</h2>
            <form id="register-form" className="form-group" onSubmit={this.handleFormSubmit}>
                <div className="label-control">
                    <label for="name" className="form-label"><h4>Name:&nbsp;&nbsp;</h4></label>
                    <input id="register-name" className="form-control" name="name" type="text" onChange={this.handleFormChange} />
                </div>

                <div className="label-control">
                    <label for="alias" className="form-label"><h4>Alias:&nbsp;&nbsp;</h4></label>
                    <input id="register-alias" className="form-control" name="alias" type="text" onChange={this.handleFormChange} /> 
                </div>

                <div className="label-control">
                    <label for="password" className="form-label"><h4>Password:&nbsp;&nbsp;</h4></label>
                    <input id="register-password" className="form-control" name="password" type="password" onChange={this.handleFormChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>);
    };
}