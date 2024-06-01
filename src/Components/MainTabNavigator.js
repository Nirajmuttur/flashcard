import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import BookMarkScreen from "./BookMarkScreen";
import Home from "./Home";
import MyAccount from "./MyAccount";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "BookMark") {
                        iconName = focused ? "bookmark" : "bookmark-outline";
                    }else if (route.name === 'MyAccount') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: "#00ADB5"
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="BookMark" component={BookMarkScreen} />
            <Tab.Screen name="MyAccount" component={MyAccount} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
