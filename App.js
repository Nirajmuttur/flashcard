import { View, Text, SafeAreaView } from "react-native";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/Components/LoginScreen";
import SignUp from "./src/Components/SignUp";
import MainTabNavigator from "./src/Components/MainTabNavigator"
import SplashScreen from "./src/Components/SplashScreen";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerMode: "screen",
          headerShown: false,
          headerBackTitleVisible: false
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreenn} options={{
          headerShown: true,
          headerTitle: '',
          headerTintColor: "#00ADB5",
          headerStyle: {
            backgroundColor: '#EEEEEE'
          }
        }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{
          headerShown: true,
          headerTitle: '',
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: '#EEEEEE'
          }
        }} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
