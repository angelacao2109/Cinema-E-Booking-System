import React from 'react';
import './EditPromo.css';

function EditPromo (){
    const [visible, setVisible] = React.useState(false);
    const [visible1, setVisible1] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    return (
        <div>
            <h1>MANAGE PROMOTIONS</h1>
            <hr/>
            

            <div className='curr'>
                <button className='promo-btn' onClick={() => setVisible(!visible)}>{visible ? 'Current Promotions':'Current Promotions'}</button>
                <div className='hidden' style={{display: visible ? 'block' : 'none'}}>
                    <div>
                    NO PROMOTIONS AT THE MOMENT
                    </div>
                    <button className='promo-btn' onClick={() => setVisible1(!visible1)}>{visible1 ? 'Edit':'Edit'}</button>
                <div className='hidden' style={{display: visible1 ? 'block' : 'none'}}>
                    <div>
                    EDIT
                    </div>
                </div>
                </div>
            </div>

            <div className='curr'>
                <button className='promo-btn' onClick={() => setVisible2(!visible2)}>{visible2 ? 'Add Promotions':'Add Promotions'}</button>
                <div className='hidden' style={{display: visible2 ? 'block' : 'none'}}>
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