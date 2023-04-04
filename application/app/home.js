import { useTheme } from '@react-navigation/native'
import { Link, Stack } from 'expo-router'
import { useState } from 'react'
import { Text, View } from 'react-native'

export default function Home () {
  const [ count, setCount ] = useState( 0 )
  const { colors } = useTheme()
  return (

      <View style={{flex: 1, height: 'auto', width: 'auto', justifyContent: "center", alignItems: "center", }}>
      {/* <Stack.Screen options={{ title: null }} /> */}
      <Text style={{color: colors.text}}>Home Screen</Text>
      <Link style={{color: colors.text}} href={{ pathname: 'details', params: { name: 'Pollo' } }}>
        Go to Details
      </Link>
          <Text style={{color: colors.text}}>Count: {count}</Text>
      </View>
  
  )
}