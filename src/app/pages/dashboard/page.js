'use client'

import { AuthContext } from '@/app/context/authContext'
import React, { useContext } from 'react'

const dashboard = () => {

    const { user, logout } = useContext(AuthContext)

    return (
        <>
        
        {user ?
        <>
            <p> {user.email} is logged in</p>
        </>
        
        :
        <>
            <p>There is no user logged</p>
        </>
        }

        </>
    )
}

export default dashboard