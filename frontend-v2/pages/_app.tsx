import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme, theme as baseTheme } from '@chakra-ui/react'

import Layout from "../components/Layout";

const colors = {
    brand: {
        purple: '#894AD9',
        mid_purple: '#6326B3',
        dark_purple: '#1C188D',
        hot_pink: '#861EAB',
        pink: '#FD72F8',
        blue: '#152B85',
        dark_blue: '#0E073B',
    },
};
const theme = extendTheme({ colors });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    );
}
