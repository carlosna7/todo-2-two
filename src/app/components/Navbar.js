'use client'

import React, { useContext } from 'react'
import Link from "next/link"
import { AuthContext } from '../context/authContext'
import { useRouter } from 'next/navigation'

const Navbar = () => {

  let router = useRouter()
  const { user, logout } = useContext(AuthContext)

  const token = localStorage.getItem("token")

  const onLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="bg-gray-300 flex justify-between px-20 p-4 items-center">

        <div className="rounded bg-gray-100 p-2">
        <Link href="/">
            HOME
        </Link>
        </div>

        <ul className="flex gap-8">
          
          <div className="rounded bg-gray-100 p-2">
            {user && token ?
              <>
                <li className="rounded bg-gray-100 p-2">
                  <Link href="/pages/dashboard/items">
                  items
                  </Link>
                </li>
                <li className="rounded bg-gray-100 p-2">
                  <Link href="/pages/dashboard/teste">
                  teste
                  </Link>
                </li>
                <button onClick={onLogout}>logout</button>
              </>
            :
            <>
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
            </>
            }
          </div>

        </ul>

    </div>
  )
}

export default Navbar