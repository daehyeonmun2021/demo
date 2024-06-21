import { Tabs } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "home",
        }}
      />
      <Tabs.Screen
        name="selected"
        options={{
          title: "selected",
        }}
      />
      <Tabs.Screen
        name="square"
        options={{
          title: "square",
        }}
      />
    </Tabs>
  );
}
