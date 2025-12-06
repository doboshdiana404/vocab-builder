import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#85aa9f",
  },
  helperText: {
    marginTop: 8,
    color: "#121417",
    fontSize: 10,
    fontFamily: "FixelDisplayRegular",
  },
  verbTypeText: {
    fontFamily: "FixelDisplayRegular",
    fontSize: 12,
    color: "#121417",
  },
});
