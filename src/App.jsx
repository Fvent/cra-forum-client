import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { Home } from './components/Home';
import { LogIn } from './components/LogIn';
import { Forum } from './components/Forum';
import { NotFound } from './components/NotFound';
import { Navbar, Nav } from 'react-bootstrap';

export class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            loggedIn : false,
            message: ''
        }
        this.handleCallback = this.handleCallback.bind(this);
    }

    handleCallback(val, msg, userPayload){
        this.setState({
            loggedIn: val,
            message: msg,
        });
        if(this.state.loggedIn === true){
            sessionStorage.setItem('name', userPayload.name);
            sessionStorage.setItem('alias', userPayload.alias);
        }
        
    }

    render(){
        return (<div id="app"> 
            <Router>
                <Navbar bg="dark" expand="lg">
                    <Navbar.Brand href="/home"><h1 id="nav-brand">Forum Client</h1></Navbar.Brand>
                    
                    <Nav className="ml-auto">
                        {this.state.loggedIn ? null : <Link id="login-link" to="/login"><h3>Login</h3></Link> }
                        
                    </Nav>
                </Navbar>

                {this.state.loggedIn ? <Forum /> : 
                <Switch>   
                <Route path="/" exact render={(props) => <Home {...props} />} />
                <Route path="/home" render={(props) => <Home {...props} />}/>
                <Route path="/login" render={(props) => <LogIn {...props} parentCallback={this.handleCallback} />}/>
                <Route render={() => <NotFound />}/>
                </Switch>}
                <h3>{this.state.message}</h3>
            </Router>

            
        </div>
        );

    }
}