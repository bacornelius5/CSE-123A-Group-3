import { DarkTheme, ThemeProvider, useTheme } from '@react-navigation/native'
import { Slot, Stack } from 'expo-router'

export default function Layout () {
  return (
    <ThemeProvider value={DarkTheme}>
      <Slot/>
    </ThemeProvider>
  )
}