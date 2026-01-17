import { StyleSheet } from "react-native";

export const editWordModalStyles = StyleSheet.create({
  modalBox: {
    backgroundColor: "#ecf0ef",
    paddingHorizontal: 16,
    paddingBottom: 64,
    paddingTop: 8,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: "rgba(23, 18, 18, 0.5)",
    alignSelf: "center",
    borderRadius: 100,
    marginBottom: 20,
  },
  label: {
    color: "#6b7280",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "#85aa9f",
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 32,
  },
  saveText: {
    color: "#fcfcfc",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "FixelDisplayBold",
  },
  cancelBtn: {
    marginTop: 8,
  },
  cancelText: {
    color: "rgba(18, 20, 23, 0.5)",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "FixelDisplayBold",
  },
});
