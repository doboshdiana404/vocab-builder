import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { ProgressBarProps } from "./types";

export default function ProgressBar({
  progress,
  size = 24,
  strokeWidth = 4,
  color = "#2bd627",
  backgroundColor = "#d4f8d3",
  showCenterLabel = false,
  centerLabel,
}: ProgressBarProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {showCenterLabel && (
        <View style={styles.center}>
          <Text style={[styles.label, { fontSize: size * 0.4 }]}>
            {centerLabel}
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  center: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    color: "#121417",
    fontFamily: "FixelDisplayMedium",
  },
});
