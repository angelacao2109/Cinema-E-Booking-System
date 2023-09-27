import React from 'react';
import './Dash.css';
function Dash() {
    return (
        <div className="dash-container">
            <h1>Hello, Admin</h1>
            <hr />
            <div className="dash-section">
                <h2>Current Movies</h2>
            </div>
            <div className="dash-section">
                <h2>Current Promotions</h2>
            </div>
        </div>
    );
}

export default Dash;
