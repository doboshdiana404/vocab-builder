import React from "react";

import Dictionary from "@/assets/icons/dictionary.svg";
import Recommend from "@/assets/icons/recommend.svg";
import Training from "@/assets/icons/training.svg";
import { HapticTab } from "@/hooks/useHapticTab";
import Header from "@/src/components/layout/Header/Header";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
export default function TabLayout() {
  return (
    <>
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle:
            Platform.OS === "android"
              ? { display: "none" }
              : {
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
            title: "Dictionary",
            tabBarLabelStyle: {
              fontSize: 10,
              fontFamily: "FixelDisplayMedium",
            },

            tabBarIcon: ({ color }) => (
              <Dictionary width={24} height={24} stroke={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="recommend"
          options={{
            title: "Recommend",
            tabBarLabelStyle: {
              fontSize: 10,
              fontFamily: "FixelDisplayMedium",
            },
            tabBarIcon: ({ color }) => (
              <Recommend width={24} height={24} stroke={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="training"
          options={{
            title: "Training",
            tabBarLabelStyle: {
              fontSize: 10,
              fontFamily: "FixelDisplayMedium",
            },
            tabBarIcon: ({ color }) => (
              <Training width={24} height={24} stroke={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="add-word"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="training/well-done"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}
