import React from "react";
import { Drawer } from "expo-router/drawer";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import { constant } from "@/constants/constant";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerActiveTintColor: "#007AFF",
          drawerInactiveTintColor: "#666",
          drawerType: "front",
          headerTintColor: "#333",
          headerTitleStyle: {
            fontSize: constant.platform === 'ios' && 20,
            fontFamily: "PoppinsMedium",
            color: "#333",
          },
          drawerLabelStyle: { fontSize: 16, marginLeft: -10 },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "CapIn",
            borderRadius: 0,
            drawerStyle: {
              backgroundColor: "#fff",
              borderTopRightRadius: 30,
              borderBottomRightRadius: 30,
              width: constant.platform == "ios" ? 320 : 370,
            },
            drawerIcon: ({ color }) => (
              <FontAwesome name="home" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            headerTintColor: "#007AFF",
            title: "Profile",
            drawerIcon: ({ color }) => (
              <FontAwesome name="user" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="logout"
          options={{
            drawerLabel: "Logout",
            headerTintColor: "#007AFF",
            title: "Logout",
            drawerIcon: ({ color }) => (
              <FontAwesome name="sign-out" size={22} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.profileImage}
            resizeMode="contain"
          />
          <Text style={styles.appName}>CapIn</Text>
        </View>
        <DrawerItemList {...props} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2020 CapIn, Inc.</Text>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  appName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
  },
  footer: {
    marginTop: "auto",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  footerText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
});
