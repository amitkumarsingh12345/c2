import { Redirect, Stack } from "expo-router";
import { useContext, useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import * as Font from 'expo-font';
import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}

function RootLayout() {
  const { user, loading } = useContext(AuthContext);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        PoppinsThin: Poppins_100Thin,
        PoppinsExtraLight: Poppins_200ExtraLight,
        PoppinsLight: Poppins_300Light,
        PoppinsRegular: Poppins_400Regular,
        PoppinsMedium: Poppins_500Medium,
        PoppinsSemiBold: Poppins_600SemiBold,
        PoppinsBold: Poppins_700Bold,
        PoppinsExtraBold: Poppins_800ExtraBold,
        PoppinsBlack: Poppins_900Black,
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (loading || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {false ? (
        <Redirect href="/(drawer)/(tabs)/home" />
      ) : (
        <Redirect href="/" />
      )}
    </>
  );
}