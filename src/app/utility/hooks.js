'use client'

import { useState } from "react"

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        // console.log(values)
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        callback()
        // console.log(values)
    }

    return { onChange, onSubmit, values}
}