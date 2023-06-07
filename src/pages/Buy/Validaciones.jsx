import React from 'react';

const Validaciones = ({ newAddress, validationError, handleInputChange }) => {
    return (
        <div>
            <div>
                <h2>Full Name:</h2>
                <input
                    type="text"
                    name="fullName"
                    value={newAddress.fullName}
                    onChange={handleInputChange}
                />
                {validationError && !newAddress.fullName && (
                    <p className='text-red-500'>Please enter your full name</p>
                )}
            </div>
            <div>
                <h2>Street and Number:</h2>
                <input
                    type="text"
                    name="street"
                    value={newAddress.street}
                    onChange={handleInputChange}
                />
                {validationError && !newAddress.street && (
                    <p className='text-red-500'>Please enter your street and number</p>
                )}
            </div>
            <div>
                <h2>Postal Code:</h2>
                <input
                    type="text"
                    name="postalCode"
                    value={newAddress.postalCode}
                    onChange={handleInputChange}
                />
                {validationError && !newAddress.postalCode && (
                    <p className='text-red-500'>Please enter your postal code</p>
                )}
            </div>
            <div>
                <h2>Phone Number:</h2>
                <input
                    type="number"
                    name="phoneNumber"
                    value={newAddress.phoneNumber}
                    onChange={handleInputChange}
                />
                {validationError && !newAddress.phoneNumber && (
                    <p className='text-red-500'>Please enter your phone number</p>
                )}
            </div>
            {validationError && <p>{validationError}</p>}
        </div>
    );
};

export default Validaciones;
