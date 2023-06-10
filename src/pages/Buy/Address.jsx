import React, { useState } from 'react';
import Validaciones from './Validaciones';
import Countries from './Countries';

export default function Address() {
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
        country: '',
        fullName: '',
        street: '',
        postalCode: '',
        phoneNumber: '',
    });
    const [validationError, setValidationError] = useState('');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const handleInputChange = (e) => {
        setNewAddress((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSelectCountry = (country) => {
        setNewAddress({
            ...newAddress,
            country: country,
        });
    };

    const handleAddAddress = () => {
        if (isFormValid()) {
            setAddresses([...addresses, newAddress]);
            setNewAddress({
                country: '',
                fullName: '',
                street: '',
                postalCode: '',
                phoneNumber: '',
            });
            setValidationError('');
            setSelectedAddress(newAddress);
            alert('Address added successfully');
        } else {
            setValidationError('Please fill in all fields');
        }
    };

    const isFormValid = () => {
        const { country, fullName, street, postalCode, phoneNumber } = newAddress;
        return country && fullName && street && postalCode && phoneNumber;
    };

    const handleToggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className='Container 1   '>
            <div >
                {!expanded && (
                    <div>
                        <h2 className='text-center'>Shipping Address:</h2>
                        {selectedAddress && (
                            <p>
                                {selectedAddress.fullName}, {selectedAddress.street},{' '}
                                {selectedAddress.postalCode}, {selectedAddress.phoneNumber}
                            </p>
                        )}
                    </div>
                )}
                {expanded && (
                    <div>
                        <h2 className='text-center'>Your Addresses:</h2>
                        <ul>
                            {addresses.map((address, index) => (
                                <li key={index}>
                                    <input
                                        type="radio"
                                        name="selectedAddress"
                                        value={address.fullName}
                                        onChange={() => setSelectedAddress(address)}
                                    />
                                    {address.fullName}, {address.street}, {address.postalCode},{' '}
                                    {address.phoneNumber}
                                </li>
                            ))}
                        </ul>
                        <h2 className='text-center mb-[10px]'>Add New Address:</h2>
                        <form className='text-center  '>
                            <div>
                                <h2 className='mb-[10px]'>Country or Region:</h2>
                                <Countries onSelectCountry={handleSelectCountry} />
                            </div>
                            <Validaciones
                                newAddress={newAddress}
                                validationError={validationError}
                                handleInputChange={handleInputChange}
                            />
                            <button type="button" className='bg-[#303079] w-32 mt-2 text-white hover:bg-[#7496b8] rounded-md ' onClick={handleAddAddress}>
                                Add Address
                            </button>
                        </form>
                    </div>
                )}
                <div className='flex justify-center'>
                    <button className='mt-2 w-32 text-white rounded-md hover:text-blue-200 hover:underline' onClick={handleToggleExpanded}>
                        {expanded ? 'Close X' : 'Change'}
                    </button>


                </div>
            </div>
        </div>
    );
}