import { StyleSheet } from "react-native";
const TAB_HEIGHT = 84;
const SHEET_HEIGHT = 408;

export const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0)",
  },

  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: TAB_HEIGHT,
    height: SHEET_HEIGHT,
    backgroundColor: "#ecf0ef",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 8,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: "rgba(18, 20, 23, 0.5)",
    alignSelf: "center",
    borderRadius: 100,
    marginBottom: 20,
  },
});
