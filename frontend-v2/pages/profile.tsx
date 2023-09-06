import { useAuth } from "Context/AuthContext";
import { useEffect } from "react";
import Router from "next/router";
import { Center, Text } from "@chakra-ui/react";

export default function private_project() {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser == null) {
      Router.push("/");
    }
  });

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <Center>
        <Text color='orange' fontSize='xl' fontWeight='normal'>
          Private Profile Page
        </Text>
      </Center>
    </div>
  )
}