import { Inter } from 'next/font/google'
import './globals.css'

import { AuthProvider } from '@/app/context/authContext'
import ApolloConnection from './apolloComponents/apolloConnection'

import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'To do 2 Two',
}

export default function RootLayout({ children }) {
  return (

    <AuthProvider>
      
      <ApolloConnection>

        <html lang="pt-br">
          
          <body className={inter.className}>
            <Navbar />
            {children}
          </body>
          
        </html>

      </ApolloConnection>

    </AuthProvider>

  )
}
