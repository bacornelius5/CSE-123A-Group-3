import { useTheme } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View } from 'react-native'


export default function Background ( { children } ) {
  const {colors} = useTheme()
  const styles = StyleSheet.create( {
    container: {
      backgroundColor: colors.background,
      flex: 1,
    },
  } )
  return (
    <LinearGradient colors={[ 'transparent', '#0f111a', '#717cb450' ]} style={styles.container}>
        {children}
    </LinearGradient>
  )
}