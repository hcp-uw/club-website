import { createContext, useContext, useEffect, useState } from "react";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// @ts-ignore
import { auth } from "@/back_end/utils";

// @ts-ignore
import { checkAdmin } from "@/utils/api";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({
    children,
}: { children: React.ReactNode }) => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isAdmin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const signIn = async () => {
        const result = await signInWithPopup(auth, provider);

        return result;
    };

    const getUser = () => {
        return auth.currentUser;
    };

    const signOut = async () => {
        return auth.signOut();
    };

    useEffect(() => {
        // rome-ignore lint/suspicious/noExplicitAny: <explanation>
        const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
            setCurrentUser(user);
            if (user) {
                setAdmin(await checkAdmin(user));
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        isAdmin,
        getUser,
        signIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
