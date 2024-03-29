'use client'

import { useEffect } from 'react'
import client from './apolloClient'
import { ApolloProvider } from '@apollo/client'
import { usePathname  } from 'next/navigation'

export default function ApolloConnection({ children }) {
  
  const router = usePathname()

  useEffect(() => {
    // console.log("mudou de página, favor conferir se o token ainda esta valido")
  }, [router])

  return (

    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>

  )
}
