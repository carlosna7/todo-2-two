'use client'

import SelectComponent from '@/app/components/SelectComponent'
import { AuthContext } from '@/app/context/authContext'
import React, { useContext, useState } from 'react'


const dashboard = () => {

    const { user, logout } = useContext(AuthContext)

    const [selectedValue, setSelectedValue] = useState([]);

    const handleSelectChange = (selectedList) => {
        setSelectedValue(selectedList);
    }

    console.log(selectedValue)


    return (

        <>
            {user ?
            <>
                <p> {user.name} is logged in</p>
            </>
            
            :
            <>
                <p>There is no user logged</p>
            </>
            }

            <SelectComponent onSelectChange={handleSelectChange} selectedValues={selectedValue} />

        </>
    )
}

export default dashboard