// app/(drawer)/_layout.tsx

import tw from '@/lib/tailwind';
import { Drawer } from 'expo-router/drawer';
import Sidebar from '../../components/ui/Sidebar';



export default function DrawerLayout() {
    return (
        <Drawer
            // Pass your custom component to the drawerContent prop
            drawerContent={(props) => <Sidebar onClose={() => props.navigation.closeDrawer()} {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: tw``,
            }}
        >
            {/* Define the screens accessible from the drawer */}
            <Drawer.Screen name="home" />

        </Drawer>
    );
}