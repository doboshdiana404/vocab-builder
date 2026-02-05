import { Platform, StyleSheet } from "react-native";
const isAndroid = Platform.OS === "android";
export const wellDoneStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#F8F8F8",
  },

  androidContent: {
    paddingHorizontal: 16,
    paddingBottom: 44,
  },

  closeButton: {
    alignSelf: "flex-end",
    padding: 12,
  },

  imageWrapper: {
    marginTop: isAndroid ? 51 : 0,

    alignItems: isAndroid ? "flex-end" : "center",
    marginBottom: isAndroid ? 0 : 24,
  },
  image: {
    maxWidth: isAndroid ? 152 : 140,
    maxHeight: isAndroid ? 121 : 112,
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "FixelDisplaySemiBold",
    color: isAndroid ? "#fcfcfc" : "#121417",
  },

  columns: {
    flexDirection: "row",
    gap: 16,
  },
  col: { flex: 1 },
  columnTitle: {
    fontFamily: "FixelDisplayRegular",
    marginBottom: 8,
    color: isAndroid ? "rgba(252, 252, 252, 0.5)" : "rgba(18, 20, 23, 0.5)",
  },
  resultItem: {
    fontSize: 16,
    marginBottom: 4,
    color: isAndroid ? "#fcfcfc" : "#121417",
    fontFamily: "FixelDisplayMedium",
  },
});
