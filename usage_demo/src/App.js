import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Demo1, Demo2, Demo3 } from './demos';

import './App.css';
import './demos/demoStyles.scss';


const Home = () => {
    return(
        <>
            <h2>Welcome to DJ Forms Builder react component.</h2>
            <p>This is a JSON based forms builder react component that renders and control a web form based on JSON configuration file.</p>
            <p>Navigate through demo pages to see usage examples and enjoy it.</p>
        </>
    )
}

export default function App() {
    return (
        <div className="main-app">
            <h1>DJ Forms Builder react component</h1>
            <h2>Navigation</h2>

            <BrowserRouter>
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/">Home Page</Link></li>
                            <li><Link to="/demo1">Demo 1 - General fields, groups and page</Link></li>
                            <li><Link to="/demo2">Demo 2 - Custom Rating component</Link></li>
                            <li><Link to="/demo3">Demo 3 - Custom Date Field Component</Link></li>
                        </ul>
                    </nav>
                    <hr/>

                    <Routes>
                        <Route exact path="/demo1" element={<Demo1 />} />
                        <Route exact path="/demo2" element={<Demo2 />} />
                        <Route exact path="/demo3" element={<Demo3 />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </BrowserRouter>

        </div>
    );
}
