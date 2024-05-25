import {View, Text, SafeAreaView} from 'react-native'
import SplashScreen from './Components/SplashScreen'

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Components/Home';
import LoginScreen from './Components/LoginScreen';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor:'#222831'},
      }}>
        <Stack.Screen
          name='SplashScreen'
          component={SplashScreen}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name='LoginScreen'
          component={LoginScreen}
          options={{
            headerShown:false,
            headerBackTitleVisible:false,
            headerLeft:null
          }}
        />
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerShown:false,
            headerBackTitleVisible:false,
            headerLeft:null
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
