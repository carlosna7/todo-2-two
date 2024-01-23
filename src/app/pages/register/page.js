'use client'

import React, { useContext, useState } from 'react'
import  { AuthContext } from '../../context/authContext'
import { useForm } from '@/app/utility/hooks'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { gql } from '@apollo/client'

const REGISTER_USER = gql `
  mutation Mutation($userInput: UserInput) {
    signUp(userInput: $userInput) {
      email
      name
      password
      permission
      token
    }
}
`

const register = (props) => {

  const context = useContext(AuthContext)
  let router = useRouter() 
  const [ errors, setErrors ] = useState([])

  function registerUserCallback() {
    // event.preventDefault()
    console.log('callback aqui')
    signUp()
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    email: '',
    name: '',
    password: '',
    permission: ''
  })

  const [ signUp, { loading } ] = useMutation(REGISTER_USER, {
    update(proxy, { data: { signUp: userData}}) {
      context.register(userData)
      router.push("/pages/login")
    },
    onError({ graphQlErrors }) {
      setErrors(graphQlErrors)
    },
    variables: { userInput: values }
  })

  return (
    <div>

      <h2>Register</h2>

      <form onSubmit={onSubmit}>
        <label className='bg-gray-100'>
          Email:
          <input className='bg-cyan-100' type="email" name="email" onChange={onChange} />
        </label>

        <label className='bg-gray-100'>
          Name:
          <input className='bg-cyan-100' type="text" name="name" onChange={onChange} />
        </label>

        <label className='bg-gray-100'>
          Password:
          <input className='bg-cyan-100' type="password" name="password" onChange={onChange} />
        </label>

        <label className='bg-gray-100'>
          Permission:
          <input className='bg-cyan-100' type="text" name="permission" onChange={onChange} />
        </label>
        
        <button type="submit">
          Register
        </button>
      </form>

    </div>
  )
}

export default register