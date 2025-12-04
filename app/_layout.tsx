import AuthGate from "@/src/components/AuthGate";
import { store } from "@/src/store/store";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Provider } from "react-redux";
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    FixelDisplayBold: require("@/assets/fonts/FixelDisplay-Bold.ttf"),
    FixelDisplayMedium: require("@/assets/fonts/FixelDisplay-Medium.ttf"),
    FixelDisplayRegular: require("@/assets/fonts/FixelDisplay-Regular.ttf"),
    FixelDisplaySemiBold: require("@/assets/fonts/FixelDisplay-SemiBold.ttf"),
    SFProDisplayLight: require("@/assets/fonts/SF-Pro-Display-Light.ttf"),
    SFProDisplayRegular: require("@/assets/fonts/SF-Pro-Display-Regular.ttf"),
  });
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <Provider store={store}>
      <AuthGate>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </AuthGate>
    </Provider>
  );
}
