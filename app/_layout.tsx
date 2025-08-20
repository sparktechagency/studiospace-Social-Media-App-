import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";



const AppLayout = () => {


  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="drawer" />
        {/* <Stack.Screen name="home" /> */}
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
        <Stack.Screen name="modals/account_switch_modal" options={{
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          contentStyle: { backgroundColor: "transparent" },
        }} />
        <Stack.Screen name="modals/socialmedia_modal" options={{
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          contentStyle: { backgroundColor: "transparent" },
        }} />
        <Stack.Screen name="modals/comments_modal" options={{
          presentation: "transparentModal",
          sheetAllowedDetents: "fitToContents",
          contentStyle: { backgroundColor: "transparent" },
        }} />

      </Stack>
    </View>
  );
}


export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppLayout />
    </>
  );
}
