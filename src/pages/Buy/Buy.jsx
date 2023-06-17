import React, { useContext } from 'react';
import ContainerAddress from './Address';
import Payment from './Payment';
import Articles from './Articles';
import NavBar from "../../components/NavBar/NavBar";
import { ThemeContext } from '../../components/ThemeProvider/ThemeProvider';
import "../../Styles/colors.css"



export default function Buy() {
    
    return (
        <div className="content-center"> {/* bg-slate-300 h-screen w-screen */}
            <NavBar />

            <div className="Container-3 max-w-lg mt-11 ml-4 ">
                <ContainerAddress />
            </div>


            <div className="Container-3 max-w-lg mt-11 ml-4 ">
                <Payment />
            </div>


            <div className="Container-3 max-w-lg mt-11 ml-4 ">
                <Articles />
            </div>
            
        </div>
    );
}