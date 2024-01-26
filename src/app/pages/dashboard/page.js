'use client'

import SelectComponent from '@/app/components/SelectComponent'
import { AuthContext } from '@/app/context/authContext'
import React, { useContext, useState } from 'react'
import { gql } from '@apollo/client'

const dashboard = () => {

    const { user, logout } = useContext(AuthContext)

    const [selectedValue, setSelectedValue] = useState([]);

    const handleSelectChange = (selectedList) => {
        setSelectedValue(selectedList)
    }

    console.log(selectedValue)

    const CREATE_TASK = gql`
    mutation CreateTask($taskInput: TaskInput) {
        createTask(taskInput: $taskInput) {
            id
            name
            responsible
            createdAt
        }
    }     
    `

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

            

            <div className='bg-gray-100 w-96 p-4 m-4 flex flex-col gap-4'>
                <SelectComponent onSelectChange={handleSelectChange} selectedValues={selectedValue} />
                <label>name</label>
                <input></input>
            </div>

        </>
    )
}

export default dashboard