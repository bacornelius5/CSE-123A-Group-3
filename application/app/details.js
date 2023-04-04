import { Stack, useRouter, useSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

export default function Details () {
  const router = useRouter()
  const params = useSearchParams()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
        title: params.name,
        }}
      />
      <Text onPress={() => {
        router.setParams({name: 'Updated'})
      }}>Update the title
      </Text>
      <Text onPress={() => { router.back() }}>
        Details Screen
      </Text>
    </View>
  )

}