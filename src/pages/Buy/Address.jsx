import React, { useState,useContext } from 'react';
import Validaciones from './Validaciones';
import Countries from './Countries';
import './Address.css'
import { ThemeContext } from "../../components/ThemeProvider/ThemeProvider.jsx";
import "../../Styles/colors.css";

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

    const { theme } = useContext(ThemeContext);

  const styles = {
    container: {
      backgroundColor: "var(--color-background)",
      color: "var(--color-text)",
    },
    container2: {
      color: "var(--color-text)",
    },
  };

    return (
        <div className="bg-[#bbf7d0] p-6 rounded shadow mt-16" style={styles.container}>
            <div className="">
                {!expanded && (
                <div style={styles.container}>
                    <h2 className="text-left font-bold mb-3">Shipping address:</h2>
                    {selectedAddress && (
                    <p className="text-left">
                        {selectedAddress.fullName}, {selectedAddress.street}, {selectedAddress.postalCode}, {selectedAddress.phoneNumber}
                    </p>
                    )}
                </div>
                )}
                {expanded && (
                <div>
                    <h2 className="text-left">Your addresses:</h2>
                    <ul>
                    {addresses.map((address, index) => (
                        <li key={index}>
                        <input
                            type="radio"
                            name="selectedAddress"
                            value={address.fullName}
                            onChange={() => setSelectedAddress(address)}
                            className="w-full"
                        />
                        {address.fullName}, {address.street}, {address.postalCode}, {address.phoneNumber}
                        </li>
                    ))}
                    </ul>
                    <h2 className="text-left mb-1">Add new address:</h2>
                    <form className="text-left">
                        <div className="color-input">
                            <div className="color-strong">
                            <h2 className="mb-1 mt-3" >Country or Region:</h2>
                            </div>
                            <Countries onSelectCountry={handleSelectCountry} />
                        </div>
                        <Validaciones newAddress={newAddress} validationError={validationError} handleInputChange={handleInputChange} />
                        <div className='color-strong'>
                        <button
                            type="button"
                            className="bg-[#9dc8c5] w-32 mt-4  hover:bg-[#7496b8] rounded-md w-full"
                            onClick={handleAddAddress}
                        >
                            Add address
                        </button>
                        </div>
                    </form>
                </div>
                )}
                <div className="flex justify-center">
                    <button className="mt-2 w-32 bg-[#9dc8c5] hover:bg-[#7496b8] rounded-md w-full" onClick={handleToggleExpanded}>
                        {expanded ? 'Close' : 'Change'}
                    </button>
                </div>
            </div>
        </div>
      );
      
      
      
}