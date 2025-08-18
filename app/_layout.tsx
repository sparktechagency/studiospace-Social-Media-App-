import { SidebarProvider, useSidebar } from "@/lib/hooks/SidebarContext";
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import Sidebar from "./components/ui/Sidebar";



const AppLayout = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();

  return (
    <View style={{ flex: 1 }}>

      <Sidebar visible={isSidebarVisible} onClose={toggleSidebar} />


      <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(splash)/splashscreen" />

        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modals/feedback_modal" options={{
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          contentStyle: { backgroundColor: "transparent" },
        }} />
        <Stack.Screen name="modals/report_modal" options={{
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          contentStyle: { backgroundColor: "transparent" },
        }} />
        <Stack.Screen name="modals/report_details" options={{
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          contentStyle: { backgroundColor: "transparent" },
        }} />

      </Stack>
    </View>
  );
}


export default function RootLayout() {
  return (
    <SidebarProvider>
      <StatusBar barStyle="light-content" />
      <AppLayout />
    </SidebarProvider>
  );
}
