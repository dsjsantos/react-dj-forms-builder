import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const strict = true; // StrictMode renders components twice (on dev but not production)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        { !strict ?
        <App /> 
        :
        <React.StrictMode>
            <App />
        </React.StrictMode>
        }
    </>
);
