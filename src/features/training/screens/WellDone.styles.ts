import { StyleSheet } from "react-native";

export const wellDoneStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#F8F8F8",
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 24,
  },
  image: {
    maxWidth: 140,
    maxHeight: 112,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "FixelDisplaySemiBold",
    color: "#121417",
  },
  columns: {
    flexDirection: "row",
    gap: 16,
  },
  col: { flex: 1 },
  columnTitle: {
    fontFamily: "FixelDisplayRegular",
    marginBottom: 8,
    color: "rgba(18, 20, 23, 0.5)",
  },
  resultItem: {
    fontSize: 16,
    marginBottom: 4,
    color: "#121417",
    fontFamily: "FixelDisplayMedium",
  },
});
