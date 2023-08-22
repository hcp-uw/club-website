import { createContext, useContext, useEffect, useState } from "react"
import { GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "back_end/utils"

// @ts-ignore
import { checkLead } from "@/utils/api";

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)
export const AuthContextProvider = ({children}: {children:React.ReactNode}) => {

  const provider = new GithubAuthProvider();

  const [currentUser, setCurrentUser] = useState<any>(null)
  const [lead, setLead] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    setLead(checkLead(result.user));
    return result;
  }

  const getUser = () => {
    return auth.currentUser;
  }

  const signOut  = async () => {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])



  return (
    <AuthContext.Provider value={{ currentUser, lead, login, signOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}