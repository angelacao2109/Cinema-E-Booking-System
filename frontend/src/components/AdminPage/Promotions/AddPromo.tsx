import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddPromo.css';
import axios from "axios";

// Define a type for your state
type PromoData = {
    promoTitle: string;
    message: string;
    initializationDate: string;
    expirationDate: string;
    promoCode: string;
    percentageOff: number;
};

const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

const email = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userEmail="))
    ?.split("=")[1];

const AddPromo: React.FC = () => {
    const navigate = useNavigate();

    const [promoData, setPromoData] = useState<PromoData>({
        promoTitle: "",
        message: "",
        initializationDate: "",
        expirationDate: "",
        promoCode: "",
        percentageOff: 0,
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
            const response = await axios.post("http://localhost:8080/api/promotion/add",
            {
                promoTitle:promoData.promoTitle,
                message:promoData.message,
                initializationDate:promoData.initializationDate,
                expirationDate:promoData.expirationDate,
                promoCode:promoData.promoCode,
                percentageOff:promoData.percentageOff
            },
            {
                headers: {
                    Authorization: authToken,
                },
            });

            if (response.status == 200) {
                const addedPromo = await response
                console.log("Promo added successfully:", addedPromo);
                
                navigate('/admin/promopage');
            } else {
                console.error("Failed to add promo");
            }
        } catch (error) {
            console.error("Error adding promo:", error);
        }
    };

    return (
        <>
            <div className='add-promo-exit-link-container'>
                {/* Fix route */}
                <Link to='/admin/promopage' className='add-promo-exit-link-styles'>
                    Exit Add Promo Page
                </Link>
            </div>
            <div className="add-promo-container">
                <div className="add-promo-header">Add Promotion</div>
                <form className="add-promo-form" onSubmit={handleSubmit}>
                    <label className="add-promo-label">
                        Name:
                        <input
                            className="add-promo-input"
                            type="text"
                            name="promoTitle"
                            value={promoData.promoTitle}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="add-promo-label">
                        Start Date:
                        <input
                            className="add-promo-input"
                            type="date"
                            name="initializationDate"
                            value={promoData.initializationDate}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="add-promo-label">
                        End Date:
                        <input
                            className="add-promo-input"
                            type="date"
                            name="expirationDate"
                            value={promoData.expirationDate}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="add-promo-label">
                        Promo Code:
                        <input
                            className="add-promo-input"
                            type="text"
                            name="promoCode"
                            value={promoData.promoCode}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="add-promo-label">
                        Percentage Off:
                        <input
                            className="add-promo-input"
                            type="text"
                            name="percentageOff"
                            value={promoData.percentageOff}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="add-promo-label">
                        Message:
                        <input
                            className="add-promo-input"
                            type="text"
                            name="message"
                            value={promoData.message}
                            onChange={handleChange}
                        />
                    </label>
                    <button className="add-promo-button" type="submit">Add Promo</button>
                </form>
            </div>
        </>
    );
};

export default AddPromo;
