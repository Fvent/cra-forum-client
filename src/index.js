import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { Home } from './components/Home';
import { LogIn } from './components/LogIn';
import { Forum } from './components/Forum';
import { NotFound } from './components/NotFound';

class App extends React.Component {
    render(){
        return ( <div id="app">
            <h1>Client Forum App</h1>
            <Router>
                <Link to="/login"><h2>Login</h2></Link>
                <Link to="/forum"><h2>Forum</h2></Link>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={LogIn} />
                    <Route path="/forum" component={Forum} />
                    <Route component={NotFound} />
                </Switch>
            </Router>

            
        </div>); 
    }
}

ReactDOM.render(<App />, document.getElementById('root'));