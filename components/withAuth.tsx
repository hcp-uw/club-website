import { useAuth } from "../Context/AuthContext";
import React, { useEffect } from "react";

import Router from "next/router";

const useMockAuth = () => {
    return {
        currentUser: {
        username: "elijah",
        },
        isLoading: true,
    };
}

export default function withAuth(WrappedComponent: any) {
  return (props: any) => {
    // const { currentUser } = useAuth();

    const { currentUser, isLoading } = useMockAuth();
    // console.log(currentUser)

    useEffect(() => {
      if (currentUser == null && !isLoading) {
        // Router.push("/");
        console.log("Not logged in")
      }
    });

    if (!currentUser) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

