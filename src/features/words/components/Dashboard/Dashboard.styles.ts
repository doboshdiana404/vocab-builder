import { StyleSheet } from "react-native";

export const dashboardStyles = StyleSheet.create({
  container: {
    padding: 16,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 15,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(18, 20, 23, 0.1)",
    position: "relative",
  },
  input: {
    flex: 1,
    fontFamily: "FixelDisplayMedium",
    fontSize: 16,
  },
  searchIcon: {
    position: "absolute",
    right: 24,
  },

  statistics: {
    flexDirection: "row",
    alignItems: "center",
  },
  studyText: {
    fontSize: 14,
    fontFamily: "FixelDisplayMedium",
    color: "rgba(18, 20, 23, 0.5)",
  },
  studyCount: {
    fontSize: 20,
    color: "#121417",
  },
  actions: {
    marginTop: 8,
    flexDirection: "row",
    gap: 16,
  },
  addWord: {
    color: "#121417",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    fontFamily: "FixelDisplayMedium",
  },
  train: {
    fontFamily: "FixelDisplayMedium",
    color: "#121417",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
  },
  irregularDescription: {
    color: "#121417",
    fontSize: 10,
    fontFamily: "FixelDisplayRegular",
  },
});
