import { useTheme } from '@react-navigation/native'
import { Link } from 'expo-router'
import { Pressable } from 'react-native'

export const CustomLink = ( props ) => {
  const {} = useTheme()
  return (
    <Link {...props} asChild>
      <Pressable></Pressable>
    </Link>
    
    )
}

