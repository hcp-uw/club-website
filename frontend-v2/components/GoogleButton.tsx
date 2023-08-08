// For testing purposes only
// Set to be removed
import { VscGithub } from "react-icons/vsc"

import { FcGoogle } from 'react-icons/fc';
import { Button, Center, Text } from '@chakra-ui/react'
import { auth } from "../back_end/utils/index.js"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { UserCredential } from "firebase/auth";
import { useAuth } from "../Context/AuthContext"
interface GoogleLoginProps {
  onLoginSuccess: (result: UserCredential) => void;
}

function GoogleLoginComponent({ onLoginSuccess } : GoogleLoginProps) {

  const { login } = useAuth()
  const handleLogin = async () => {
    try {
      const result = await login()
      onLoginSuccess(result)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Center p={8}>
      <Button onClick={handleLogin}
              bg='gray'
              w={'full'}
              maxW={'md'}
              variant={'outline'}
              leftIcon={<VscGithub />}>
        <Center>
          <Text>Test login</Text>
        </Center>
      </Button>
    </Center>
  );
}

export default GoogleLoginComponent;