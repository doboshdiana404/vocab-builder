import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(18, 20, 23, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },

  modal: {
    width: "90%",
    backgroundColor: "#85aa9f",
    borderRadius: 15,
    padding: 16,
    paddingBottom: 48,
  },

  header: {
    alignItems: "flex-end",
    marginBottom: 8,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    gap: 8,
  },

  saveBtn: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 32,
  },

  saveText: {
    color: "#121417",
    fontSize: 16,
    fontFamily: "FixelDisplayBold",
  },

  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#fcfcfc",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 30,
  },

  cancelText: {
    color: "#fcfcfc",
    fontSize: 16,
    fontFamily: "FixelDisplayBold",
  },
});
