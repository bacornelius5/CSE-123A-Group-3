import { Link, Stack } from 'expo-router'
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from '../context/auth'
import { useTheme } from '@react-navigation/native'

export default function Index () {
  const { signOut } = useAuth()
  const {colors} = useTheme()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: 'center',
      padding: 24,
      backgroundColor: colors.background
    },
    main: {
      justifyContent: "center",
      maxWidth: 960,
      marginHorizontal: "auto",
      padding: 20,
      borderRadius: 10,
      gap: 10
    },
    title: {
      fontSize: 64,
      fontWeight: "bold",
      color: colors.text
    },
    subtitle: {
      fontSize: 36,
      color: colors.text
    },
    text: {
      color: colors.text,
    }
  } )
  
  return (
    <>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
        <Link style={styles.text} href={'/details'}>Go to details</Link>
        <Text style={styles.text} onPress={() => signOut()}>Sign Out</Text>
      </View>
    </>
  );
}

