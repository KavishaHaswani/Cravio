import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './ExploreMenu.css';
import { StoreContext } from '../context/StoreContext';

const ExploreMenu = () => {
    const [categories, setCategories] = useState([]);
    const { category, setCategory } = useContext(StoreContext);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3003/category');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="explore-menu">
            {categories.map((cat, index) => (
                <div
                    onClick={() => setCategory(prev => (prev === cat.name ? "All" : cat.name))}
                    key={index}
                    className={`category-card ${category === cat.name ? "active" : ""}`}
                >
                    <img
                        src={`/assets/${cat.image}.png`}
                        alt={cat.name}
                        className="category-image"
                    />
                    <h3 className="category-name">{cat.name}</h3>
                </div>
            ))}
        </div>
    );
};

export default ExploreMenu;

