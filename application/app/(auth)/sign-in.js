import { Text, View } from 'react-native'
import { useAuth } from '../../context/auth'
import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Background from '../../Background'
import { Stack, useNavigation } from 'expo-router'

export default function SignIn () {
  const { signIn } = useAuth()
  const { colors } = useTheme()
  const navigation = useNavigation()
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();

  const styles = StyleSheet.create( {
    container: {
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 64,
      fontWeight: "bold",
      color: colors.text
    },
    text: {
      input: {
        color: 'black',
        fontWeight: '600',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderRadius: 10,
        gap: 10,

        padding: 10,
        backgroundColor: '#a6accd',

      }
    }
  }
  )
  return (
        <View style={{alignSelf: 'center', width: 'auto', flexDirection: 'column', gap: 10, columnGap: 50, borderRadius: 10, backgroundColor: '#0f111a', padding: 20 }}>
          <Text style={{alignSelf: 'center' ,...styles.title}}>Login</Text>
          <TextInput style={styles.text.input} autoComplete='current-password' autoFocus={true} inputMode='email' placeholderTextColor={'grey'} placeholder={`username or email`}></TextInput>
          <TextInput style={styles.text.input} placeholderTextColor={'grey'} placeholder={`password`}></TextInput>
          <Text style={{alignSelf: 'center',color: colors.text }} onPress={() => signIn()}>Submit</Text>
        </View>  
  )
}