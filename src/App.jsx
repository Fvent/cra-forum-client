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
            loggedIn : false
        }
        this.handleCallback = this.handleCallback.bind(this);
    }

    handleCallback(val){
        this.setState({loggedIn: val});
    }

    render(){
        return (<div id="app"> 
            <Router>
                <Navbar bg="dark" expand="lg">
                    <Navbar.Brand href="/home">Forum Client</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Link id="login-link" to="/login"><h3>Login</h3></Link>
                    </Nav>
                </Navbar>

                {this.state.loggedIn ? <Forum /> : 
                <Switch>   
                <Route path="/" exact render={(props) => <Home {...props} />} />
                <Route path="/home" render={(props) => <Home {...props} />}/>
                <Route path="/login" render={(props) => <LogIn {...props} parentCallback={this.handleCallback} />}/>
                <Route render={() => <NotFound />}/>
                </Switch>}
                
            </Router>

            
        </div>
        );

    }
}