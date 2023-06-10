import React from 'react';
import ContainerAddress from './Address';
import Payment from './Payment';
import Articles from './Articles';
import NavBar from "../../components/NavBar/NavBar";
import { Link } from 'react-router-dom';

export default function Buy() {
    return (
        <div className='bg-slate-300 h-screen w-screen'>
            <NavBar />
            <div className="Container-3 max-w-lg mt-11 ml-4 bg-[#9DC8C5] border border-gray-300">
                <ContainerAddress />
            </div>
            <div className="Container-3 max-w-lg mt-2 ml-4 bg-[#9DC8C5] border border-gray-300">
                <Payment />
            </div>
            <div className="Container-3 max-w-lg mt-2 ml-4 bg-[#9DC8C5] border border-gray-300">
                <Articles />
            </div>
        </div>
    );
}