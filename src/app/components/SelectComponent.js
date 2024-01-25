'use client'

import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Multiselect from 'multiselect-react-dropdown'

const GET_USER = gql`
    query Query($amount: Int) {
        getUsers(amount: $amount) {
            id
            name
        }
    }
`;

const SelectComponent = ({ onSelectChange, selectedValues }) => {


    const { loading, error, data } = useQuery(GET_USER, {
        variables: { amount: 3 },
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const users = data.getUsers
    // console.log(data)

    return (
        <div className='bg-gray-100 w-96 p-4 m-4'>

            <Multiselect
                options={users}
                selectedValues={selectedValues}
                onSelect={value => onSelectChange(value)}
                onRemove={value => onSelectChange(value)}
                displayValue="name"
                showCheckbox
            >
            </Multiselect>

        </div>
    )
}

export default SelectComponent