// @ts-ignore
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import Router from "next/router";
import { Center, Text } from "@chakra-ui/react";
import withAuth from "components/withAuth";

const Profile = () => {
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

export default function ProfileProtected() {
    return withAuth(Profile);
}