import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme as baseTheme, extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
// import { AuthContextProvider } from "@/context/AuthContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const colors = {
    brand: {
        purple: "#894AD9",
        mid_purple: "#6326B3",
        dark_purple: "#1C188D",
        hot_pink: "#861EAB",
        dark_pink: "#5F0F7F",
        pink: "#FD72F8",
        mid_white: "#DCD5E4",
        blue: "#152B85",
        dark_blue: "#0E073B",
        light_brown: "#E2C6C6",
    },
};

const theme = extendTheme({ colors });

export default function App({ Component, pageProps, session }: any) {
    return (
        <SessionProvider session={session}>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </SessionProvider>
    );
}
