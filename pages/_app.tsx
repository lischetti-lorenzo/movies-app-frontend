import { ApolloProvider } from '@apollo/client'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { client } from '../grapgql/client'
import { AuthContext } from '../services/providers/AuthContext'
import { useEffect, useState } from 'react'
import { ProtectedRoute } from '../components/ProtectedRoute'
import ToastNotify from '../components/ToastNotify'
import {
  Poppins,
  Playfair_Display,
  Manrope
} from "@next/font/google";
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { USER } from '../constants/auth'
import { User } from '../types/user.types'

const poppins = Poppins({
  weight: ["100", "400", "700"],
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  weight: ["700"],
  subsets: ["latin"],
});

const manrope = Manrope({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>(undefined);

  useEffect(() => {
    
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem(USER)) as User;
      if (storedUser) setUser(storedUser);
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --poppins: ${poppins.style.fontFamily};
          --font-playfair-display: ${playfair.style.fontFamily};
          --font-manrope: ${manrope.style.fontFamily};
        }
      `}</style>
      <ToastNotify />
      <AuthContext.Provider value={{ user, setUser }}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
              <main className="font-manrope min-h-screen" style={{ backgroundColor: 'background.paper'}}>
                <ProtectedRoute {...pageProps}>
                  <Component {...pageProps} />
                </ProtectedRoute>
              </main>
          </ThemeProvider>
        </ApolloProvider>
      </AuthContext.Provider>
    </>
  )
}
