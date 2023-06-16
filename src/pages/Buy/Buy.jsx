import React, { useContext } from 'react';
import ContainerAddress from './Address';
import Payment from './Payment';
import Articles from './Articles';
import NavBar from "../../components/NavBar/NavBar";
import { ThemeContext } from '../../components/ThemeProvider/ThemeProvider';
import "../../Styles/colors.css"



export default function Buy() {

    const { theme } = useContext(ThemeContext);

    return (
        <div className={`bg-slate-300 h-screen w-screen`} style={{backgroundColor: "var(--color-background)"}}>
            <NavBar />
            <div className={`Container-3 max-w-lg mt-11 ml-4 border border-gray-300`} style={{ backgroundColor: 'var(--color-background)'}}>
                <ContainerAddress />
            </div>
            <div className={`Container-3 max-w-lg mt-11 ml-4 border border-gray-300`} style={{ backgroundColor: 'var(--color-background)'}}>
                <Payment />
            </div>
            <div className={`Container-3 max-w-lg mt-11 ml-4 border border-gray-300`} style={{ backgroundColor: 'var(--color-background)'}}>
                <Articles />
            </div>
        </div>
    );
}