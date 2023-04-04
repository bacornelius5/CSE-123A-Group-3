import { useRouter, useSegments } from 'expo-router'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext( null )

export function useAuth () {
  return useContext(AuthContext)
}

function useProtectedRoute ( user ) {
  const segments = useSegments()
  const router = useRouter()

  useEffect( () => {
    const inAuthGroup = segments[ 0 ] === '(auth)'
    
    if ( !user && !inAuthGroup ) {
      // redirect to sign in
      router.replace('/sign-in')
    } else if ( user && inAuthGroup ) {
      // redirect away from sign in page
      router.replace('/')
    }
  }, [user, segments])
}

export function Provider ( props ) {
  const [ user, setAuth ] = useState( null )
  
  useProtectedRoute( user )
  
  return (
    <AuthContext.Provider
      value={{
        signIn: () => setAuth( {} ),
        signOut: () => setAuth( null ),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}