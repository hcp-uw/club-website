import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "back_end/utils"

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)
export const AuthContextProvider = ({children}: {children:React.ReactNode}) => {

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          user: user
        })
      } else {
        setUser(null);
      }
      setLoading(false);
    })

    return () => unsubscribe()
  }, [])

  const login = async () => {
    return
  }

  const logout  = async () => {
    setUser(null);
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}