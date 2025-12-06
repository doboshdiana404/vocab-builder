import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 46,
    paddingBottom: 8,
    backgroundColor: "#fff",
    position: "relative",
  },
  user: {
    alignItems: "center",
    gap: 4,
  },
  avatar: {},
  userIconWrap: {
    width: 48,
    height: 48,
    backgroundColor: "#85aa9f",
    borderRadius: 30,
    padding: 12,
  },
  name: {
    fontSize: 12,
    color: "#121417",
    fontFamily: "FixelDisplayMedium",
  },
  logout: {
    color: "#85aa9f",
    fontSize: 16,
    fontFamily: "FixelDisplayMedium",
  },
  logoutLink: {
    position: "absolute",
    right: 16,
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 18,
    bottom: 32,
    padding: 8,
  },
});
