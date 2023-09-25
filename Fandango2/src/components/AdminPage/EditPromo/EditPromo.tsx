import React from 'react';
import './EditPromo.css';

function EditPromo() {
    return (
        <div>
            <h1>MANAGE PROMOTIONS</h1>
            <hr/>

            <div className='promo-section'> 
                <div className='curr'>
                    <h2>Current Promotions</h2>
                    <div>
                        NO PROMOTIONS AT THE MOMENT
                    </div>
                    <div className='edit-section'> 
                        <h2>Edit</h2>
                        EDIT CONTENT HERE
                    </div>
                </div>

                <div className='curr'>
                    <h2>Add Promotions</h2>
                    <div>
                        <label>Promotion Code</label>
                        <input></input>
                    </div>

                    <div>
                        <label>Start Date</label>
                        <input type="date"></input>
                    </div>

                    <div>
                        <label>End Date</label>
                        <input type="date"></input>
                    </div>

                    <div>
                        <label>Discount (%)</label>
                        <input type="number"></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPromo;
