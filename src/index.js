import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Navigation } from "./features/Navigation";

class App extends React.Component {
    render(){
        return ( <div id="app">
            <h1>Client Forum App</h1>
            <Navigation />

            
        </div>); 
    }
}

ReactDOM.render(<App />, document.getElementById('root'));