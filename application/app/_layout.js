import { Link, Slot, Stack } from 'expo-router'
import { Provider } from '../context/auth'
import { DarkTheme, ThemeProvider, useTheme } from '@react-navigation/native'
import Background from '../Background'
import { Image, Text, View } from 'react-native'

const routes = [{ pathname: 'home', label: 'Home' },{ pathname: 'dashboard', label: 'Dashboard' },{ pathname: 'settings', label: 'Settings' }]

function LogoTitle () {
  
  return (
    <Image style={{ width: 35, height: 50 }}
      source={{ uri: '/logo.png' }}
    />
  )
}

function Header ( { title = 'Grow Things' } ) {
  const {colors} = useTheme()
  return (
    <View style={{ paddingTop: 10, flex: 1, gap: 20, flexDirection: 'row' }}>
      <View style={{width: 'auto', flexDirection: 'row', gap: 10}}>
      <LogoTitle />
      <Text style={{
        fontSize: 30,
        fontWeight: "bold",
        color: colors.text
      }}>
        {title}
        </Text>
      </View>
      <View style={{width: 'auto', flexDirection: 'row', gap: 10, justifyContent: "flex-end", alignContent: 'flex-end'}}>
      {routes.map( ( { pathname, label } ) => <Link style={{ fontSize: 30, fontWeight: 'normal', color: colors.text }} href={{ pathname: pathname }} >{label}</Link> )}
      </View>
      </View>
  )
}

export default function Root () {
  return (
    <ThemeProvider value={DarkTheme}>
      <Provider>
        <Background>
          <Stack screenOptions={{
            headerTitle: () => <Header />,
            headerTintColor: '#a6accd',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white'
            },
          }}>
            <Stack.Screen name="(auth)/sign-in" title={null} />
            <Stack.Screen name="home" title={null}/>
          </Stack>
        </Background>
    </Provider>
    </ThemeProvider>


  )
}