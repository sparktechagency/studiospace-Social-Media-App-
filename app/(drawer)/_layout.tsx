// app/(drawer)/_layout.tsx

import { Drawer } from 'expo-router/drawer';
import Sidebar from '../components/ui/Sidebar';



export default function DrawerLayout() {
    return (
        <Drawer
            // Pass your custom component to the drawerContent prop
            drawerContent={(props) => <Sidebar onClose={() => props.navigation.closeDrawer()} {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    width: '80%',
                },
            }}
        >
            {/* Define the screens accessible from the drawer */}
            <Drawer.Screen name="home" />
            <Drawer.Screen name="profile" />
        </Drawer>
    );
}