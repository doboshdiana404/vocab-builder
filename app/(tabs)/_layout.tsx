import React from "react";

import Dictionary from "@/assets/icons/dictionary.svg";
import Recommend from "@/assets/icons/recommend.svg";
import Training from "@/assets/icons/training.svg";
import Header from "@/src/components/Header/Header";
import { HapticTab } from "@/src/components/haptic-tab";
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <>
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
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
          name="recommend/index"
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
          name="add-word/index"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}
