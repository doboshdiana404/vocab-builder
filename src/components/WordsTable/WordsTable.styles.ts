import { StyleSheet } from "react-native";

export const wordsTableStyles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#f9fafb",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  headerRow: {
    flexDirection: "row",
    backgroundColor: "rgba(133, 170, 159, 0.1)",

    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: 54,
  },
  headerText: {
    textAlign: "center",
    color: "#121417",
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 12,
  },

  row: {
    flexDirection: "row",
    backgroundColor: "#fcfcfc",
    borderTopWidth: 1,
    borderColor: "#dbdbdb",
  },

  cell: {
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#dbdbdb",
    paddingVertical: 12,
    paddingHorizontal: 8,
    minHeight: 70,
  },

  lastCell: {
    borderRightWidth: 0,
  },

  cellText: {
    color: "#121417",
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.01)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15,
    display: "flex",
    gap: 8,
  },

  modalAction: {
    fontFamily: "FixelDisplayMedium",
    fontSize: 14,
    color: "#121417",
  },

  modalCancel: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 5,
  },
});
