import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './PromoPage.css';

// Define a type for the promo object
type Promo = {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
    code: string;
    discount: number;
    status: 'active' | 'inactive';
};

const PromoPage: React.FC = () => {
    const [promos, setPromos] = useState<Promo[]>([]);

    useEffect(() => {
        fetchPromotions();
    }, []);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const fetchPromotions = async () => {
        try {
            const response = await fetch('http://localhost:5173/api/promo/');
            const data: Promo[] = await response.json();
            setPromos(data);
        } catch (error) {
            console.error('Error fetching promotions:', error);
        }
    };
    
    const filterPromos = (status: Promo['status']): Promo[] => {
        return promos.filter(promo => promo.status === status);
    };

    return (
        <div>
            <div className="manage-promotions-header">
                MANAGE PROMOTIONS
                <Link to="/addpromo">
                    <button className="add-promo-button">Add Promo</button>
                </Link>
            </div>
            <div>
                <div className="promo-name-header">Active Promotions</div>
                <ul className="promo-list">
                    {filterPromos('active').map(promo => (
                        <li key={promo._id} className="promo-item">
                            <p><strong>Name:</strong> {promo.name}</p>
                            <p><strong>Start Date:</strong> {formatDate(promo.startDate)}</p>
                            <p><strong>End Date:</strong> {formatDate(promo.endDate)}</p>
                            <p><strong>Code:</strong> {promo.code}</p>
                            <p><strong>Discount:</strong> {promo.discount}%</p>
                            <Link to={`/editpromo/${promo._id}`} className="edit-promo-link">
                                Edit Promo
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <div className="promo-name-header">Inactive Promotions</div>
                <ul className="promo-list">
                    {filterPromos('inactive').map(promo => (
                        <li key={promo._id} className="promo-item">
                            <p><strong>Name:</strong> {promo.name}</p>
                            <p><strong>Start Date:</strong> {formatDate(promo.startDate)}</p>
                            <p><strong>End Date:</strong> {formatDate(promo.endDate)}</p>
                            <p><strong>Code:</strong> {promo.code}</p>
                            <p><strong>Discount:</strong> {promo.discount}%</p>
                            <Link to={`/editpromo/${promo._id}`} className="edit-promo-link">
                                Edit Promo
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PromoPage;
