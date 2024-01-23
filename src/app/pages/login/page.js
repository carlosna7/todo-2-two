'use client'

import React, { useContext, useState } from 'react'
import  { AuthContext } from '../../context/authContext'
import { useForm } from '@/app/utility/hooks'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { gql } from '@apollo/client'

const LOGIN_USER = gql `
  mutation SignIn($loginInput: LoginInput) {
    signIn(loginInput: $loginInput) {
      email
      password
      token
    }
  }
`

const login = (props) => {

  const context = useContext(AuthContext)
  let router = useRouter() 
  const [ errors, setErrors ] = useState([])

  function loginUserCallback() {
    // event.preventDefault()
    console.log('callback aqui')
    signIn()
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: ''
  })

  const [ signIn, { loading } ] = useMutation(LOGIN_USER, {
    update(proxy, { data: { signIn: userData}}) {
      context.login(userData)
      router.push("/pages/dashboard")
    },
    onError({ graphQlErrors }) {
      setErrors(graphQlErrors)
    },
    variables: { loginInput: values }
  })

  return (
    <div>

      <h2>Login</h2>

      <form onSubmit={onSubmit}>
        <label className='bg-gray-100'>
          Email:
          <input className='bg-cyan-100' type="email" name="email" onChange={onChange} />
        </label>
       
        <label className='bg-gray-100'>
          Password:
          <input className='bg-cyan-100' type="password" name="password" onChange={onChange} />
        </label>
       
        <button type="submit">
          Login
        </button>
      </form>

    </div>
  )
}

export default login