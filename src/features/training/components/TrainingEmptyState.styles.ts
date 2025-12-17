import { StyleSheet } from "react-native";

export const trainingEmptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
    backgroundColor: "#F8F8F8",
  },
  imageWrap: {
    alignItems: "center",
    marginBottom: 32,
  },
  image: {
    width: 144,
    height: 166,
  },
  title: {
    fontSize: 16,
    fontFamily: "FixelDisplayMedium",
    color: "#121417",
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    color: "#121417",
    marginBottom: 64,
    fontFamily: "FixelDisplayRegular",
  },
  primaryBtn: {
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#85aa9f",
    marginBottom: 8,
    paddingVertical: 16,
  },
  primaryText: {
    color: "#fcfcfc",
    fontFamily: "FixelDisplayBold",
    fontSize: 16,
  },
  cancel: {
    textAlign: "center",
    color: "rgba(18, 20, 23, 0.5)",
    fontFamily: "FixelDisplayBold",
  },
});
