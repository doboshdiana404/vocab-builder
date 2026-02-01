import { Platform, StyleSheet } from "react-native";

const isAndroid = Platform.OS === "android";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: isAndroid ? "transparent" : "#f8f8f8",
    paddingHorizontal: 16,
    paddingVertical: isAndroid ? 48 : 32,
  },
  title: {
    fontSize: 24,
    fontFamily: "FixelDisplaySemiBold",
    color: isAndroid ? "#FCFCFC" : "#121417",
  },
  description: {
    fontSize: 16,
    color: isAndroid ? "#FCFCFC" : "rgba(18, 20, 23, 0.8)",
    marginTop: 16,
    marginBottom: 16,
    fontFamily: "FixelDisplayRegular",
  },
  fieldContainer: {
    marginBottom: isAndroid ? 16 : 24,
  },
  hintContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  hint: {
    color: isAndroid ? "#FCFCFC" : "#121417",
    fontSize: 10,
    fontFamily: "FixelDisplayRegular",
  },
  hintPlaceholder: {
    opacity: 0,
    height: 8.6,
  },
  btnsWrap: {
    flexDirection: isAndroid ? "row" : "column",
    justifyContent: isAndroid ? "space-between" : "flex-start",
    gap: 8,
    marginTop: 32,
  },
  submitButton: {
    backgroundColor: isAndroid ? "#FCFCFC" : "#85aa9f",
    paddingVertical: isAndroid ? 12 : 16,
    borderRadius: 30,
    alignItems: "center",
    flex: 1,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitText: {
    color: isAndroid ? "#121417" : "#fcfcfc",
    fontSize: 16,
    fontFamily: "FixelDisplayBold",
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: isAndroid ? 12 : 0,
    borderWidth: isAndroid ? 1 : 0,
    borderColor: isAndroid ? "rgba(252, 252, 252, 0.4)" : "transparent",
    borderRadius: 30,
  },
  cancelText: {
    color: isAndroid ? "#FCFCFC" : "rgba(18, 20, 23, 0.5)",
    fontSize: 16,
    fontFamily: "FixelDisplayBold",
  },
});
