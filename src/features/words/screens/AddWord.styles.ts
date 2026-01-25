import { StyleSheet } from "react-native";

export const addWordStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "FixelDisplaySemiBold",
    color: "#121417",
  },
  description: {
    fontSize: 16,
    color: "rgba(18, 20, 23, 0.8)",
    marginTop: 16,
    marginBottom: 16,
    fontFamily: "FixelDisplayRegular",
  },
  fieldContainer: {
    marginBottom: 24,
    marginTop: 14,
  },
  submitButton: {
    backgroundColor: "#85aa9f",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 32,
  },
  submitText: {
    color: "#fcfcfc",
    fontSize: 16,
    fontFamily: "FixelDisplayBold",
  },
  cancelButton: {
    marginTop: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "rgba(18, 20, 23, 0.5)",
    fontSize: 16,
    fontFamily: "FixelDisplayBold",
  },
});
