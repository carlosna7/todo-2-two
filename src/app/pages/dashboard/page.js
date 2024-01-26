'use client'

import SelectComponent from '@/app/components/SelectComponent'
import { AuthContext } from '@/app/context/authContext'
import React, { useContext, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useForm } from '@/app/utility/hooks'

const dashboard = () => {

    const { user, logout } = useContext(AuthContext)

    const [selectedValue, setSelectedValue] = useState([]);

    const handleSelectChange = (selectedList) => {
        setSelectedValue(selectedList)
    }

    // console.log(selectedValue)
    const responsible = selectedValue.map(user => user.name)

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

    function createTaskCallback() {
        // event.preventDefault()
        console.log('callback aqui')
        createTask()
    }

    const { onChange, onSubmit, values } = useForm(createTaskCallback, {
        name: '',
        responsible: ''
    })

    const [ createTask ] = useMutation(CREATE_TASK, {
        update(proxy, { data: { createTask: data}}) {
            
        },
        onError({ graphQlErrors }) {
            setErrors(graphQlErrors)
        },
        variables: { taskInput: {
            name: values.name,
            responsible: responsible
        }}
    })

    const handleSubmit = (event) => {
        // event.preventDefault()

        // const taskInput = {
        //     name: values.name,
        //     responsible: responsible
        // }

        // createTask({ variables: { taskInput } });
    }

    return (

        <>
            <div className='bg-gray-100 w-96 p-4 m-4'>
                {user ?
                    <>
                        <p> {user.name} is logged in</p>
                    </>
                
                    :
                    <>
                        <p>There is no user logged</p>
                    </>
                }
            </div>

            <div className='bg-gray-100 w-96 p-4 m-4 flex flex-col gap-4' onSubmit={handleSubmit}>
                <SelectComponent onSelectChange={handleSelectChange} selectedValues={selectedValue} onChange={onChange} />
                <label>name</label>
                <input type='name' name='name' onChange={onChange}/>
                <button type="submit" onClick={onSubmit}>Submit</button>
            </div>

        </>
    )
}

export default dashboard