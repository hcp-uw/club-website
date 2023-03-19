import Image from "next/image";
import { Inter } from "@next/font/google";
import {
    Center
} from "@chakra-ui/react";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Center>
                <Image
                    src="/output-onlinegiftools.gif"
                    width={300}
                    height={300}
                    alt="13"
                    priority
                />
            </Center>
        </>
    );
}
