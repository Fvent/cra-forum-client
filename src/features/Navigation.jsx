import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { Home } from '../components/Home';
import { LogIn } from '../components/LogIn';
import { Forum } from '../components/Forum';
import { NotFound } from '../components/NotFound';
import { Navbar, Nav } from 'react-bootstrap';


export class Navigation extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (<Router>
            
            <Navbar bg="dark">
                <Nav className="mr-auto">
                    <Link id="login-link" to="/login"><h2>Login</h2></Link>
                    <Link id="forum-link" to="/forum"><h2>Forum</h2></Link>
                </Nav>
            </Navbar>


            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={LogIn} />
                <Route path="/forum" component={Forum} />
                <Route component={NotFound} />
            </Switch>
        </Router>);

    }
}