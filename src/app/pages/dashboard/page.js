'use client'

import { AuthContext } from '@/app/context/authContext'
import React, { useContext, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_USER = gql`
    query Query($amount: Int) {
        getUsers(amount: $amount) {
            id
            name
        }
    }
`;

const dashboard = () => {

    const { user, logout } = useContext(AuthContext)

    const { loading, error, data } = useQuery(GET_USER, {
        variables: { amount: 3 },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const users = data.getUsers
    console.log(data)

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

            <select>
                <option>Selecione um usuário</option>

                {users.forEach(user => {
                    // <option key={user.id} value={user.id}>
                    //     {user.name}
                    // </option>

                    <p></p>

                })}

            </select>   

            <div>
            {users.map(user => {
                
                    

            })}
            </div>   

        </>
    )
}

export default dashboard