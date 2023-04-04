import { Link, Stack } from 'expo-router'
import { useState } from 'react'
import { Button, Image, Text, View } from 'react-native'

function LogoTitle () {
  return (
    <Image style={{ width: 50, height: 50 }}
      source={{ uri: '/logo.png' }}
    />
  )
}

export default function Home () {
  const [count, setCount] = useState(0)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          title: 'My Home Title',
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: ( props ) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => setCount( ( c ) => c + 1 )}
              title='Update count'
            />
          ),
        }}
      />
      <Text>Home Screen</Text>
      <Link href={{ pathname: 'details', params: { name: 'Pollo' } }}>
        Go to Details
      </Link>
      <Text>Count: {count}</Text>
    </View>
  )
}