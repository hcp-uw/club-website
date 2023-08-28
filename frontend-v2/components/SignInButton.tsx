// For testing purposes only
// Set to be removed
import React from "react";
import { UserCredential } from "firebase/auth";
import { useAuth } from "../Context/AuthContext"
import { Button, Center, Text } from '@chakra-ui/react'
import { VscGithub } from "react-icons/vsc"

import { checkMembership, getGithubUser } from "utils/api"
interface SignInProps {
  onSignInSuccess: (result: UserCredential) => void;
}

function SignInComponent({ onSignInSuccess } : SignInProps) {

  const { signIn } = useAuth()
  const handleSignIn = async () => {
    try {
      // let sam = await getGithubUser(process.env.NEXT_PUBLIC_MY_ACCESS_TOKEN);
      // let out = await checkMembership(sam);
      // console.log(out);
      const result = await signIn()
      onSignInSuccess(result)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Center p={8}>
      <Button onClick={handleSignIn}
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

export default SignInComponent;