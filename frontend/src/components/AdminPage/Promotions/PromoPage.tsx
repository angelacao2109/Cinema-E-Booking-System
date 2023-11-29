import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './PromoPage.css';
import axios from "axios";


// Define a type for the promo object
type Promo = {
    id: number;
    promoTitle: string;
    message: string;
    initializationDate: string;
    expirationDate: string;
    promoCode: string;
};

const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

const email = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userEmail="))
    ?.split("=")[1];

const PromoPage: React.FC = () => {
    const [promos, setPromos] = useState<Promo[]>([]);
    const [hasPromos, setHasPromos] = useState(true);

    useEffect(() => {
        fetchPromotions();
    }, []);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const fetchPromotions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/promotion/all', {
                headers: {
                    Authorization: authToken,
                },
            });
            setPromos(response.data);
            setHasPromos(true);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                console.error('No Active Promotions Found');
                setHasPromos(false);
            } else {
                console.error('Error fetching promotions:', error);
            }
        }
    };

    const filterPromos = (isActive: boolean): Promo[] => {
        const currentDate = new Date();
        return promos.filter(promo => {
            const startDate = new Date(promo.initializationDate);
            const endDate = new Date(promo.expirationDate);
            return isActive ? (startDate <= currentDate && currentDate <= endDate) : (endDate < currentDate);
        });
    };

    return (
        <div>
            <div className="manage-promotions-header">
                MANAGE PROMOTIONS
                <Link to="/admin/addpromo">
                    <button className="add-promo-button">Add Promo</button>
                </Link>
            </div>
            {hasPromos ? (
                <div>
                    <div>
                        <div className="promo-name-header">Active Promotions</div>
                        <ul className="promo-list">
                            {filterPromos(true).map(promo => (
                                <li key={promo.id} className="promo-item">
                                    <p><strong>Name:</strong> {promo.promoTitle}</p>
                                    <p><strong>Start Date:</strong> {formatDate(promo.initializationDate)}</p>
                                    <p><strong>End Date:</strong> {formatDate(promo.expirationDate)}</p>
                                    <p><strong>Code:</strong> {promo.promoCode}</p>
                                    <p><strong>Message:</strong> {promo.message}%</p>
                                    <Link to={`/admin/editpromo/${promo.id}`} className="edit-promo-link">
                                        Edit Promo
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="promo-name-header">Inactive Promotions</div>
                        <ul className="promo-list">
                            {filterPromos(false).map(promo => (
                                <li key={promo.id} className="promo-item">
                                    <p><strong>Name:</strong> {promo.promoTitle}</p>
                                    <p><strong>Start Date:</strong> {formatDate(promo.initializationDate)}</p>
                                    <p><strong>End Date:</strong> {formatDate(promo.expirationDate)}</p>
                                    <p><strong>Code:</strong> {promo.promoCode}</p>
                                    <p><strong>Message:</strong> {promo.message}%</p>
                                    <Link to={`/admin/editpromo/${promo.id}`} className="edit-promo-link">
                                        Edit Promo
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="no-promotions-message">
                    No Active Promotions Available
                </div>
            )}

        </div>
    );
};

export default PromoPage;