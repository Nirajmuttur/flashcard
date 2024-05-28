import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import BookMarkScreen from "./BookMarkScreen";
import Home from "./Home";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Bookmarks") {
                        iconName = focused ? "bookmark" : "bookmark-outline";
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: "#00ADB5",
                inactiveTintColor: "gray",
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="BookMark" component={BookMarkScreen} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
