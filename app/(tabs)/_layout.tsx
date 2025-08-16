import { Tabs } from "expo-router";
import { StatusBar } from "react-native";
import CustomTabBar from "../components/CustomTabBar";


export default function TabLayout() {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { display: "none" },
                }}
                tabBar={() => <CustomTabBar />}
            >
                <Tabs.Screen name="index" />
                <Tabs.Screen name="wallet" />
                <Tabs.Screen name="routes" />
                <Tabs.Screen name="notification" />
                <Tabs.Screen name="profile" />
            </Tabs>
        </>
    );
}
