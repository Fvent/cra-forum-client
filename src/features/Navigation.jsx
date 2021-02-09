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
            
            {/* <Nav id="navigation-nav" className="justify-content-right">
                <Nav.Item><Nav.Link id="login-link" href="/login">Login</Nav.Link></Nav.Item>
                
            </Nav> */}
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="/home">Forum Client</Navbar.Brand>
                <Nav className="ml-auto">
                    <Link id="login-link" to="/login"><h3>Login</h3></Link>
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