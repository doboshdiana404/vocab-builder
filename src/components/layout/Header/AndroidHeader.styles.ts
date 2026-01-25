import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 94,
    paddingHorizontal: 16,
    paddingTop: 42,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 16,
    color: "#121417",
    fontFamily: "FixelDisplayMedium",
  },
  userIconWrap: {
    width: 36,
    height: 36,
    backgroundColor: "#85aa9f",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
