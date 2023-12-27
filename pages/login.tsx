import { Center, Flex, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";

import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";

import {
    SpecialIconSubmitButton,
    SpecialSubmitButton,
} from "@/components/Parts";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

function Title() {
    return (
        <Center>
            <Text as="h2" color="white" fontSize="6xl" fontWeight="semibold">
                Member Login
            </Text>
        </Center>
    );
}

interface ILoginProps {
    session: Session | null | undefined;
}

function LoginForm(props: ILoginProps) {
    const { session } = props;
    console.log(session);
    if (session) {
        return (
            <VStack spacing={10} marginTop="50px" width="50vw" minWidth="300px">
                <Text
                    display="inline"
                    fontSize="2xl"
                    color="white"
                    textAlign="center"
                >
                    You are already logged in as {session.user?.name}!
                </Text>
                <SpecialSubmitButton
                    text="Logout"
                    onClick={() => signOut()}
                    // @ts-ignore
                    icon={
                        <FontAwesomeIcon size="lg" icon={faUpRightFromSquare} />
                    }
                />
            </VStack>
        );
    }
    return (
        <VStack spacing={10} marginTop="50px" width="50vw" minWidth="300px">
            <Text
                display="inline"
                fontSize="2xl"
                color="white"
                textAlign="center"
            >
                Login to access the HCP member dashboard!
            </Text>
            <SpecialIconSubmitButton
                text="Login with Github"
                onClick={() => signIn("github")}
                icon={<FontAwesomeIcon size="lg" icon={faUpRightFromSquare} />}
            />
        </VStack>
    );
}

export default function Login() {
    // Scroll to top of page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { data: session } = useSession();
    return (
        <VStack spacing="40px">
            <Title />
            <LoginForm session={session} />
        </VStack>
    );
}
