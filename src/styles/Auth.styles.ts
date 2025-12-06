import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    fontFamily: "FixelDisplayMedium",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 104,
  },
  image: {
    maxWidth: 247,
    maxHeight: 191,
  },
  subtitle: {
    marginTop: 16,
    color: "rgba(18, 20, 23, 0.8)",
    fontSize: 14,
    fontFamily: "FixelDisplayRegular",
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formContainer: {
    minHeight: 455,
    backgroundColor: "#edf0ef",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 57,
  },
  loginTitle: {
    fontSize: 30,
    marginBottom: 16,
    lineHeight: 32,
    letterSpacing: -0.6,
    color: "#121417",
    fontFamily: "FixelDisplaySemiBold",
  },
  description: {
    color: "rgba(18, 20, 23, 0.8)",
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "FixelDisplayRegular",
  },
  input: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(18, 20, 23, 0.1)",
    marginBottom: 14,
    fontSize: 16,
    color: "#121417",
    fontFamily: "FixelDisplayRegular",
  },
  button: {
    backgroundColor: "#85aa9f",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: {
    color: "#fcfcfc",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "FixelDisplayBold",
  },
  register: {
    marginTop: 16,
    color: "rgba(18, 20, 23, 0.5)",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    textDecorationLine: "underline",
    fontFamily: "FixelDisplayBold",
  },
  //PasswordInput
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(18, 20, 23, 0.1)",
    borderRadius: 15,
    paddingHorizontal: 18,
    marginBottom: 14,
  },

  inputPassword: {
    flex: 1,
    height: 55,
    color: "#121417",
  },

  eyeIcon: {
    padding: 4,
  },
});
