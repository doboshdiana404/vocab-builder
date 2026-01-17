import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    gap: 8,
  },
  pageBtn: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 10,
  },
  activePage: {
    backgroundColor: "#7ca59b",
    borderColor: "#7ca59b",
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.4,
  },
  dots: {
    marginHorizontal: 4,
    color: "#9ca3af",
  },
});
