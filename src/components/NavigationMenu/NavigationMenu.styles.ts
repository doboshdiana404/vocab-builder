import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  menu: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 185,
    backgroundColor: "#85aa9f",
    paddingTop: 48,
    paddingBottom: 220,
    paddingHorizontal: 16,
  },

  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 126,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 16,
    color: "#fcfcfc",
    fontFamily: "FixelDisplayMedium",
  },
  userIconWrap: {
    width: 36,
    height: 36,
    backgroundColor: "#fcfcfc",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 0,
    marginBottom: 15,
    maxWidth: 128,
    borderRadius: 15,
  },

  menuItemActive: {
    paddingHorizontal: 20,
    backgroundColor: "#fcfcfc",
  },

  menuItemText: {
    fontSize: 14,
    fontFamily: "FixelDisplayMedium",
    color: "#fcfcfc",
  },

  menuItemTextActive: {
    color: "#121417",
  },

  logout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  logOutText: {
    fontSize: 14,
    fontFamily: "FixelDisplayMedium",
    color: "#fcfcfc",
  },
  bottomImage: {
    position: "absolute",
    bottom: 0,
    width: 185,
    zIndex: -1,
  },
});
