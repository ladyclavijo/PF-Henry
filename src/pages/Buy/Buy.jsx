import React from 'react'
import ContainerAddress from './Address'
import Payment from './Payment'
import Articles from './Articles'

export default function Buy() {
    return (
        <div>
            <ContainerAddress />
            <Payment />
            <Articles />
        </div>
    )
}
