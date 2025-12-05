import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: { position: "relative", zIndex: 1000 },
  dropdown: {
    borderColor: "rgba(18, 20, 23, 0.1)",
    borderRadius: 15,
    backgroundColor: "#f8f8f8",
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  dropdownContainer: {
    borderColor: "#E3E3E3",
    backgroundColor: "#fff",
    borderRadius: 15,
    maxHeight: 240,
    ...Platform.select({
      ios: {
        shadowColor: "#121417",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: { elevation: 8 },
    }),
  },
  text: { fontSize: 16, color: "#121417", fontFamily: "FixelDisplayMedium" },
  label: { color: "#121417", fontSize: 16 },
  listItemLabel: { fontFamily: "FixelDisplayMedium", fontSize: 16 },
  listItem: { paddingVertical: 4, paddingHorizontal: 24 },
  listItemText: {
    fontSize: 16,
    color: "rgba(18, 20, 23, 0.5)",
    fontFamily: "FixelDisplayRegular",
  },
  listItemTextSelected: { color: "#85aa9f" },
});
