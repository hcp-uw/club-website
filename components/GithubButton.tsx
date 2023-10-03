// For testing purposes only
// Set to be removed
import React from "react";
import { UserCredential } from "firebase/auth";
// @ts-ignore
// import { useAuth } from "@/context/AuthContext"
import { Button, Center, Text } from "@chakra-ui/react";
// import { VscGithub } from "react-icons/vsc";

interface GithubLoginProps {
    onLoginSuccess: (result: UserCredential) => void;
}

function GithubLoginComponent({ onLoginSuccess }: GithubLoginProps) {
    // const { login } = useAuth()
    const handleLogin = async () => {
        try {
            // const result = await login()
            // onLoginSuccess(result)
            // rome-ignore lint/correctness/noUnreachable: <explanation>
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Center p={8}>
            <Button
                onClick={handleLogin}
                bg='gray'
                w={"full"}
                maxW={"md"}
                variant={"outline"}
                // leftIcon={<VscGithub />}
            >
                <Center>
                    <Text>Test login</Text>
                </Center>
            </Button>
        </Center>
    );
}

export default GithubLoginComponent;
