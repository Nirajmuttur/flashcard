import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/Components/LoginScreen";
import SignUp from "./src/Components/SignUp";
import MainTabNavigator from "./src/Components/MainTabNavigator"
import SplashScreen from "./src/Components/SplashScreen";
import { AuthProvider, useAuth } from "./src/Provider/AuthContext";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function AppNavigator() {
  const { user, loading } = useAuth();
  return (
    <Stack.Navigator
      initialRouteName={user ? 'MainTabNavigator' : 'SplashScreen'}
      screenOptions={{
        headerMode: "screen",
        headerShown: false,
        headerBackTitleVisible: false
      }}
    >
      <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
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
    </Stack.Navigator>
  )
}
function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
