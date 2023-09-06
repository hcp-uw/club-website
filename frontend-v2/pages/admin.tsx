import { useAuth } from "Context/AuthContext";
import { useEffect } from "react";
import Router from "next/router";
import { Center, Text } from "@chakra-ui/react";

export default function admin() {
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) {
      Router.push("/");
    }
  });

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <Center>
        <Text color='orange' fontSize='xl' fontWeight='normal'>
          Admin Page
        </Text>
      </Center>
    </div>
  )
}