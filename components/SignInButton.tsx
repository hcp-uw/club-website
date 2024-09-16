// import { useAuth } from "@/context/AuthContext"
import { Button, Center, Text } from "@chakra-ui/react";
import type { UserCredential } from "firebase/auth";
// For testing purposes only
// Set to be removed
import React from "react";
// import { VscGithub } from "react-icons/vsc";

interface SignInProps {
    onSignInSuccess: (result: UserCredential) => void;
}

function SignInComponent({ onSignInSuccess }: SignInProps) {
    // const { signIn } = useAuth()
    const handleSignIn = async () => {
        try {
            // biome-ignore lint/correctness/noUnreachable: <explanation>
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Center p={8}>
            <Button
                onClick={handleSignIn}
                bg="gray"
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

export default SignInComponent;
