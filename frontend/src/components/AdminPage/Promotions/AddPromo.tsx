import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddPromo.css';

// Define a type for your state
type PromoData = {
    name: string;
    startDate: string;
    endDate: string;
    code: string;
    discount: number;
    status: string;
};

const AddPromo: React.FC = () => {
    const navigate = useNavigate();

    const [promoData, setPromoData] = useState<PromoData>({
        name: "",
        startDate: "",
        endDate: "",
        code: "",
        discount: 0,
        status: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPromoData({
            ...promoData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5173/api/promo/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(promoData),
            });

            if (response.ok) {
                const addedPromo = await response.json();
                console.log("Promo added successfully:", addedPromo);
                navigate('/promopage');
            } else {
                console.error("Failed to add promo");
            }
        } catch (error) {
            console.error("Error adding promo:", error);
        }
    };

    return (
        <>
            <div className='link-container'>
                <Link to='/promopage' className='link-styles'>
                    Exit Add Promo Page
                </Link>
            </div>
            <div className="promo-container">
                <div className="add-promo-header">Add Promotion</div>
                <form className="add-promo-form" onSubmit={handleSubmit}>
                    <label className="add-promo-label">
                        Name:
                        <input 
                            className="add-promo-input"
                            type="text"
                            name="name"
                            value={promoData.name}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="add-promo-label">
                        Start Date:
                        <input
                            className="add-promo-input"
                            type="date"
                            name="startDate"
                            value={promoData.startDate}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="add-promo-label">
                        End Date:
                        <input
                            className="add-promo-input"
                            type="date"
                            name="endDate"
                            value={promoData.endDate}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="add-promo-label">
                        Code:
                        <input
                            className="add-promo-input"   
                            type="text"
                            name="code"
                            value={promoData.code}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="add-promo-label">
                        Discount:
                        <input
                            className="add-promo-input"
                            type="number"
                            name="discount"
                            value={promoData.discount}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="add-promo-label">
                        Status:
                        <select
                            className="add-promo-input"
                            name="status"
                            value={promoData.status}
                            onChange={handleChange}>
                                <option value=''>Select Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                        </select>
                    </label>
                    <button className="add-promo-button " type="submit">Add Promo</button>
                </form>
            </div>
        </>
    );
};

export default AddPromo;
