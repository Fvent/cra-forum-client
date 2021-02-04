import React from 'react';

export class LogIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : ''
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