import { VscGithub } from "react-icons/vsc"
import { Button, Center, Text } from '@chakra-ui/react'
import { auth } from "../back_end/utils/index.js"
import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import { UserCredential } from "firebase/auth"
import React from "react"
import { useAuth } from "Context/AuthContext"

interface GithubLoginProps {
  onLoginSuccess: (result: UserCredential) => void;
}

function GithubLoginComponent({ onLoginSuccess } : GithubLoginProps) {

  const { user } = useAuth();

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      onLoginSuccess(result);
    } catch (err) {

      console.error(err);
    }
  };

  return  (
    <Center p={8}>
      <Button onClick={handleGithubLogin}
              bg='gray'
              w={'full'}
              maxW={'md'}
              variant={'outline'}
              leftIcon={<VscGithub />}>
        <Center>
          <Text>Sign in with Github</Text>
        </Center>
      </Button>
    </Center>
  );
}

export default GithubLoginComponent;