import * as React from 'react'
import './App.css'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import {ChartCard} from './modules/ChartCard';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f111a',
    height: '80%',
    width: '60%',
    
  },
  background: {
    flex: 1,
    backgroundColor: '#090b10',
    height: '100%',
  },
  text: {
    color: '#a6accd'
  },
});

const App = () => {
  const [screenDims, setScreen] = React.useState(Dimensions.get('screen'));
  const [windowDims, setWindow] = React.useState(Dimensions.get('window'));

  React.useEffect( () => {
    const handleChange = ( { screen, window: w } ) => {
      setScreen( screen )
      setWindow(w)
    }

    const subscription = Dimensions.addEventListener( 'change', handleChange )
    return () => {
      subscription.remove()
    }
  }, [setScreen, setWindow])
  // React.useEffect(() => {
  //   const handleChange = ({ screen, window: win }) => {
  //     setScreen(screen);
  //     setWindow(win);
  //   };

  //   const subscription = Dimensions.addEventListener('change', handleChange);
  //   return () => {
  //     subscription.remove();
  //   };
  // }, [setScreen, setWindow]);
  return (
    <div style={styles.background}>
      <View style={styles.container}>
          <ChartCard />
      </View>
    </div>
    )
}


export default App;
