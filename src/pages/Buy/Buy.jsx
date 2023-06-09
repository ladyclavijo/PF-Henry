import React from 'react'
import ContainerAddress from './Address'
import Payment from './Payment'
import Articles from './Articles'
import { Link } from 'react-router-dom';

export default function Buy() {
    return (
        <div>
            <Link to='/home'>Home</Link>
            <ContainerAddress />
            <Payment />
            <Articles />
        </div>
    )
};
