import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  label: {
    fontSize: 14,
    fontFamily: "FixelDisplayMedium",
    color: "#121417",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(18, 20, 23, 0.1)",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 8,
    fontSize: 16,
    fontFamily: "FixelDisplayMedium",
    color: "#121417",
  },
  error: {
    color: "#d80027",
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#85aa9f",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 32,
  },
});
