import { createContext, useContext, useEffect, useState } from 'react'
import { client } from '~/services/firebase'

interface IAuthContext {
  currentUser: client.User | null
  isLoadingUserData: boolean
  signInWithGoogle: () => Promise<client.auth.UserCredential>
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<client.auth.UserCredential>
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<client.auth.UserCredential>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  isLoadingUserData: false,
  signInWithGoogle: null,
  createUserWithEmailAndPassword: null,
  signInWithEmailAndPassword: null,
  signOut: null,
})

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IAuthContext['currentUser']>(
    null
  )
  const [isLoadingUserData, setIsLoadingUserData] = useState<
    IAuthContext['isLoadingUserData']
  >(true)

  useEffect(() => {
    client.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setIsLoadingUserData(false)
    })
  }, [])

  const signInWithGoogle: IAuthContext['signInWithGoogle'] = async () => {
    const googleAuthProvider = new client.auth.GoogleAuthProvider()
    return await client.auth().signInWithPopup(googleAuthProvider)
  }

  const createUserWithEmailAndPassword: IAuthContext['createUserWithEmailAndPassword'] = async (
    email,
    password
  ) => {
    return await client.auth().createUserWithEmailAndPassword(email, password)
  }

  const signInWithEmailAndPassword: IAuthContext['signInWithEmailAndPassword'] = async (
    email,
    password
  ) => {
    return await client.auth().signInWithEmailAndPassword(email, password)
  }

  const signOut: IAuthContext['signOut'] = async () => {
    return await client.auth().signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoadingUserData,
        signInWithGoogle,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export default useAuth
