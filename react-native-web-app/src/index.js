// import { AppRegistry } from 'react-native'
import { registerRootComponent } from 'expo';
import App from './App';

// // register the app
// AppRegistry.registerComponent( 'App', () => App );
registerRootComponent(App)
// AppRegistry.runApplication('App', {
//   initialProps: {},
//   rootTag: document.getElementById('root') ??  document.getElementById( 'App' )
// } );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

