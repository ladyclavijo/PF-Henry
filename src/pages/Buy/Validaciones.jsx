import React, {useContext} from 'react';
import './Validaciones.css'
import { ThemeContext } from "../../components/ThemeProvider/ThemeProvider.jsx";
import "../../Styles/colors.css";


const Validaciones = ({ newAddress, validationError, handleInputChange }) => {

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
        <div>
            <div>
                <h2 className="mt-2">Full Name:</h2>
                <div className="color-input">
                <input
                    type="text"
                    name="fullName"
                    value={newAddress.fullName}
                    onChange={handleInputChange}
                    className="w-full rounded-md"
                />
                {validationError && !newAddress.fullName && (
                    <p className='text-red-500'>Please enter your full name</p>
                )}
                </div>
            </div>
            <div>
                <h2 className="mt-2">Street and Number:</h2>
                <div className="color-input">
                <input
                    type="text"
                    name="street"
                    value={newAddress.street}
                    onChange={handleInputChange}
                    className="w-full rounded-md"
                />
                {validationError && !newAddress.street && (
                    <p className='text-red-500'>Please enter your street and number</p>
                )}
                </div>
            </div>
            <div>
                <h2 className="mt-2">Postal Code:</h2>
                <div className="color-input">
                <input
                    type="number"
                    name="postalCode"
                    value={newAddress.postalCode}
                    onChange={handleInputChange}
                    className="w-full rounded-md"
                />
                {validationError && !newAddress.postalCode && (
                    <p className='text-red-500'>Please enter your postal code</p>
                )}
                </div>
            </div>
            <div>
                <h2 className="mt-2">Phone Number:</h2>
                <div className="color-input">
                <input
                    type="number"
                    name="phoneNumber"
                    value={newAddress.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full rounded-md"
                />
                {validationError && !newAddress.phoneNumber && (
                    <p className='text-red-500'>Please enter your phone number</p>
                )}
                </div>
            </div>
            {validationError && <p>{validationError}</p>}
        </div>
    );
};

export default Validaciones;
