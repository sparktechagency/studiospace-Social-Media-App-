import { SidebarProvider, useSidebar } from "@/lib/hooks/SidebarContext";
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import Sidebar from "./components/ui/Sidebar";


// This component contains the main layout and renders the sidebar
// It uses the context to get the sidebar's visibility state.
const AppLayout = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();

  return (
    <View style={{ flex: 1 }}>
      {/* The Sidebar is rendered here, on top of all other content */}
      <Sidebar visible={isSidebarVisible} onClose={toggleSidebar} />

      {/* Your app's navigation stack */}
      <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(splash)/splashscreen" />
        {/* All your tab screens are nested within this single screen */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </View>
  );
}

// The final RootLayout wraps the entire app with the SidebarProvider
export default function RootLayout() {
  return (
    <SidebarProvider>
      <StatusBar barStyle="light-content" />
      <AppLayout />
    </SidebarProvider>
  );
}
