import Header from "@/src/components/Header/Header";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <>
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "rgba(133, 170, 159, 0.94)",
            borderTopWidth: 0,
            backdropFilter: "blur(20px)",
            height: 84,
          },
          tabBarActiveTintColor: "#fcfcfc",
          tabBarInactiveTintColor: "rgba(252, 252, 252, 0.5)",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
      </Tabs>
    </>
  );
}
