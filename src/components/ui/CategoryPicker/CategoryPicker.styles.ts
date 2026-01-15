import { Platform, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },

  control: {
    borderColor: "rgba(18, 20, 23, 0.1)",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#f8f8f8",
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  controlText: {
    fontSize: 16,
    color: "#121417",
    fontFamily: "FixelDisplayMedium",
  },

  portalRoot: {
    ...StyleSheet.absoluteFillObject,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },

  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",

    ...Platform.select({
      ios: {
        shadowColor: "rgba(18, 20, 23, 0.08)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 47,
      },
      android: {
        elevation: 12,
      },
    }),
  },

  scrollContent: {
    paddingVertical: 0,
  },

  item: {
    paddingVertical: 4,
  },

  itemText: {
    fontSize: 16,
    color: "rgba(18, 20, 23, 0.5)",
    fontFamily: "FixelDisplayMedium",
  },

  itemTextSelected: {
    color: "#85aa9f",
  },
  dropdownInner: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
});
