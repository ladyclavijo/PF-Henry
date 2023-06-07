import React, { useState, useEffect } from 'react';

const Countries = ({ onSelectCountry }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v2/all');
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.log('Error fetching countries:', error);
        }
    };

    return (
        <select name="country" onChange={(e) => onSelectCountry(e.target.value)}>
            <option value="">Select a country</option>
            {countries.map((country) => (
                <option key={country.alpha2Code} value={country.name}>
                    {country.name}
                </option>
            ))}
        </select>
    );
};

export default Countries;
