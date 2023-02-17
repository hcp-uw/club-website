import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    
      <Component {...pageProps} />
    
  )
}
