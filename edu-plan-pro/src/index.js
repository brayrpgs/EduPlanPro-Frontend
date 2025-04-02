import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
//import "./index.css"

if(false){
    require( "./index.css")
}else{
    require( "./indexx.css")
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

