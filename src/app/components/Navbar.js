'use client'

import React, { useContext } from 'react'
import Link from "next/link"
import { AuthContext } from '../context/authContext'
import { useRouter } from 'next/navigation'

const Navbar = () => {

  let router = useRouter()
  const { user, logout } = useContext(AuthContext)

  const onLogout = () => {
    logout()
    router.push("/")
  } 

  console.log(user)

  return (
    <div className="bg-gray-300 flex justify-between px-20 p-4 items-center">

        <div className="rounded bg-gray-100 p-2">
        <Link href="/">
            HOME
        </Link>
        </div>

        <ul className="flex gap-8">
        <li className="rounded bg-gray-100 p-2">
            <Link href="/pages/login">
            Login
            </Link>
        </li>
        <li className="rounded bg-gray-100 p-2">
            <Link href="/pages/register">
            Register
            </Link>
        </li>
        </ul>

    </div>
  )
}

export default Navbar