import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/scss/main.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload. did
                        that!
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer">
                        Learn React
                    </a>
                    <button className="btn">It Works!</button>
                </header>
            </div>
        );
    }
}

export default App;
