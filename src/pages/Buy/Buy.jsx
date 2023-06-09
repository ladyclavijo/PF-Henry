import React from 'react'
import ContainerAddress from './Address'
import Payment from './Payment'
import Articles from './Articles'
import { Link } from 'react-router-dom';

export default function Buy() {
    return (
        <main className='Contenedor-Contenedores grid justify-center bg-black w-full'>
            <ContainerAddress />
            <Payment />
            <Articles />
        </main>
    )
};
