// For testing purposes only
// Set to be removed
import { FcGoogle } from 'react-icons/fc';
import { Button, Center, Text } from '@chakra-ui/react'
import { auth } from "../back_end/utils/index.js"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { UserCredential } from "firebase/auth";

interface GoogleLoginProps {
  onLoginSuccess: (result: UserCredential) => void;
}

function GoogleLoginComponent({ onLoginSuccess } : GoogleLoginProps) {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      onLoginSuccess(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Center p={8}>
      <Button onClick={handleGoogleLogin}
              bg='gray'
              w={'full'}
              maxW={'md'}
              variant={'outline'}
              leftIcon={<FcGoogle />}>
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  );
}

export default GoogleLoginComponent;